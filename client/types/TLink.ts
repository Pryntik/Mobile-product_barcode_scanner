export type PageType = 'Acceuil' | 'Panier' | 'HistoriqueAchat';

export type RouteType = {
  navigate(component: PageType): void,
};