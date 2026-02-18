import { SidebarItem } from "@/domain/models/sidebar-item";
import * as icons from "@/domain/constants/icons.constant";
import { RoutesEnum } from "@/domain/enums/routes.enum";

/** Rutas donde se usa layout "producto": sidebar reducido, sin footer ni buscador */
export const FOCUSED_ROUTES = [
  "/dashboard",
  "/exchange",
  "/orders",
  "/faq",
  "/company",
  "/contact",
] as const;

/** Prefijos de ruta que también son "producto" (ej. /order/:id) */
export const FOCUSED_ROUTE_PREFIXES = ["/order/"] as const;

export function isFocusedRoute(path: string): boolean {
  if (FOCUSED_ROUTES.some((r) => r === path)) return true;
  if (path.startsWith("/order/") || path === "/order") return true;
  return false;
}

/** Navegación reducida: Inicio, Cambiar, Mis órdenes (+ "Más" expandible en SideBar) */
export const SIDEBAR_LINKS_FOCUSED: SidebarItem[] = [
  { title: "Inicio", titleKey: "inicio", icon: icons.HOME_ICON, route: RoutesEnum.DASHBOARD, show: true },
  { title: "Cambiar", titleKey: "cambiar", icon: "mdi-swap-horizontal", route: RoutesEnum.EXCHANGE, show: true },
  { title: "Mis órdenes", titleKey: "misOrdenes", icon: "mdi-format-list-checks", route: RoutesEnum.ORDERS, show: true },
];

/** Solo estos ítems se muestran al desplegar "Más" dentro del producto */
export const SIDEBAR_LINKS_MORE: SidebarItem[] = [
  { title: "FAQ", titleKey: "faq", icon: icons.FAQ_ICON, route: RoutesEnum.FAQ, show: true },
  { title: "Company", titleKey: "company", icon: icons.OFFICE_BUILDING_ICON, route: RoutesEnum.COMPANY, show: true },
  { title: "Contact", titleKey: "contact", icon: icons.ACCOUNT_BOX_ICON, route: RoutesEnum.CONTACT, show: true },
];

export const SIDEBAR_LINKS: SidebarItem[] = [
  { title: "Home", titleKey: "home", icon: icons.HOME_ICON, route: RoutesEnum.HOME, show: true },
  { title: "Buy Crypto", titleKey: "buyCrypto", icon: icons.CART_ICON, route: RoutesEnum.BUY_CRYPTO, show: false },
  { title: "How it works", titleKey: "howItWorks", svg: "/works.svg", route: RoutesEnum.HOW_IT_WORKS, show: true },
  { title: "Discover us", titleKey: "discoverUs", icon: "mdi-earth", route: RoutesEnum.DISCOVER, show: true },
  { title: "Community", titleKey: "community", icon: icons.ACCOUNT_ICON_GROUP, route: RoutesEnum.COMMUNITY, show: true },
  { title: "Company", titleKey: "company", icon: icons.OFFICE_BUILDING_ICON, route: RoutesEnum.COMPANY, show: true },
  { title: "Blog", titleKey: "blog", icon: "mdi-file-document", route: RoutesEnum.BLOG, show: true },
  { title: "Inversores", titleKey: "inversores", icon: icons.INVESTORS_ICON, route: RoutesEnum.INVESTORS, show: true },
  { title: "FAQ", titleKey: "faq", icon: icons.FAQ_ICON, route: RoutesEnum.FAQ, show: true },
  { title: "Contact", titleKey: "contact", icon: icons.ACCOUNT_BOX_ICON, route: RoutesEnum.CONTACT, show: true },
];
