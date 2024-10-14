import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParameterCodec,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public makeRequestTelegram = (text: string, chatid: string, token: string) => {
    const msg = encodeURI(text);
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatid}&parse_mode=html&text=${msg}`;

    const httpRequest$ = this.http.post(url, text, {
      headers: {},
      observe: 'body',
    });

    return httpRequest$;
  };

  /**
   * @param url relative url of specific endpoint. That method automatically removes `/topic` prefix if it's exist
   * @param body payload for request. Can be null.
   * @param options additional settings
   */
  public makeRequest = <T = any>(
    url: string,
    body: any = {},
    options: any = null
  ): Observable<T> => {
    const defaultOptions = {
      method: 'GET',
      withCredentials: false,
      observe: 'body',
      base64: false,
      showError: true,
      skip401Redirect: false,
    };

    options = { ...defaultOptions, ...options };

    const payload = { ...body };
    const convertPayloadToBase64 = () =>
      btoa(encodeURIComponent(JSON.stringify(payload)));
    const getParams = options.base64
      ? { message: convertPayloadToBase64() }
      : this.getParamsByPayload(payload, this.getHttpParamsCustomEncoder());

    let httpRequest$: Observable<HttpResponse<T>> | null = null;
    options.method === 'GET' &&
      (httpRequest$ = this.http.get<T>(url, {
        headers: {},
        observe: 'response',
        params: getParams,
      }));
    options.method === 'PUT' &&
      (httpRequest$ = this.http.put<T>(url, payload, {
        headers: {},
        observe: 'response',
      }));
    options.method === 'DELETE' &&
      (httpRequest$ = this.http.request<T>('delete', url, {
        headers: {},
        observe: 'response',
        params: getParams,
      }));
    !httpRequest$ &&
      (httpRequest$ = this.http.post<T>(url, payload, {
        headers: {},
        observe: 'response',
      })); // POST, by default

    const requestWithNotifications$ = httpRequest$.pipe(
      map((res) => {
        // messages with code 204 return null, but we have some handlers which check if body contains something
        // so we convert it to an empty object for 204 case
        if (options && options.observe === 'body' && res.status === 204) {
          return {};
        }
        if (options && options.observe === 'body') {
          return res.body;
        }
        if (options && options.observe === 'response') {
          return res;
        }
        throw new Error(
          `Provided unsupported observe option (${
            options && options.observe
          }) into makeRequest method`
        );
      })
    );

    const requestWithLogs$ = new Observable<T>((observer) => {
      return (
        environment.production
          ? requestWithNotifications$
          : requestWithNotifications$.pipe(
              tap(
                (msg) => console.info({ url, request: body, response: msg }),
                (msg) =>
                  console.info({
                    url,
                    request: body,
                    response: msg && msg.error,
                    error: msg,
                  })
              )
            )
      ).subscribe(observer as any);
    });

    return requestWithLogs$;
  };

  private getParamsByPayload = (payload: any, encoder: HttpParameterCodec) => {
    let params = new HttpParams({ encoder });
    Object.keys(payload).forEach((key) => {
      if (Array.isArray(payload[key])) {
        if (!!payload[key].length) {
          payload[key].forEach((val: any) => {
            // BE doesn't accept null or undefined as get param
            val !== undefined &&
              payload[key] !== null &&
              (params = params.append(key + '[]', this.stringifyIfDate(val)));
          });
        }
      } else {
        // BE doesn't accept null or undefined as get param
        payload[key] !== undefined &&
          payload[key] !== null &&
          (params = params.append(key, this.stringifyIfDate(payload[key])));
      }
    });
    return params;
  };

  /**
   * Default angular HTTP-encoder uses encodeURI function to encode the whole URL.
   * It may work not as expected if params should contain some special symbols related to URL:
   *
   * , / ? : @ & = + $ #
   *
   * For examle, if you try to pass a variable which contains '+' sign, it won't be encoded, so
   * the URL will be: http://example.com?/name=qq+qq
   *
   * And the value will be interpretated as 'qq qq' on BE side.
   *
   * In order to fix this behaviour, we use different encoder implementation
   * which uses encodeURIComponent for separate keys/values,
   * so the url will be: http://example.com?/name=qq%2Bqq
   */
  private getHttpParamsCustomEncoder = (): HttpParameterCodec => {
    const customEncoder: HttpParameterCodec = {
      encodeKey: encodeURIComponent,
      encodeValue: encodeURIComponent,
      decodeKey: decodeURIComponent,
      decodeValue: decodeURIComponent,
    };
    return customEncoder;
  };

  private stringifyIfDate = (val: any) => {
    return val instanceof Date ? val.toJSON() : val;
  };
}
