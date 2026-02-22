export type SidebarItem = {
  title?: string;
  /** Clave i18n (ej. 'inicio') para sidebar.xxx */
  titleKey?: string;
  text?: string;
  icon?: string;
  svg?: string;
  route: string;
  show?: boolean;
};
