export type PageType = 'Home' | 'Basket' | 'History';

export type RouteType = {
  navigate(component: PageType): void,
};