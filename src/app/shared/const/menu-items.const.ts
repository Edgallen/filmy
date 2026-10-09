export interface IMenu {
  text: string;
  iconUrl: string;
  link: string;
  id: string;
  disabled: boolean;
}

export const NAV_CONST: IMenu[] = [
  {
    text: 'Главная',
    iconUrl: '/icons/home.svg',
    link: '/private/home',
    id: 'home',
    disabled: false,
  },
  {
    text: 'Избранное',
    iconUrl: '/icons/star.svg',
    link: '/private/favorites',
    id: 'favorites',
    disabled: false,
  },
];
