export interface MenuItem {
  id: string;
  link: string;
  image: string;
  title: string;
  child?: MenuItem[];
}
