import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  showLogs: boolean = !environment.production;

  log(...message: any[]): void {
    this.showLogs && console.log(this.date, ...message);
  }

  debug(...message: any[]): void {
    this.showLogs && console.log(this.date, ...message);
  }

  warn(...message: any[]): void {
    this.showLogs && console.warn(this.date, ...message);
  }

  error(...message: any[]): void {
    this.showLogs && console.error(this.date, ...message);
  }

  private get date(): string {
    return new Date().toLocaleTimeString();
  }
}
