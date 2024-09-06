import { SidebarItem } from "@/domain/models/sidebar-item";
import * as icons from "@/domain/constants/icons.constant";
import { RoutesEnum } from "@/domain/enums/routes.enum";

export const SIDEBAR_LINKS: SidebarItem[] = [
  {
    title: "Home",
    icon: icons.HOME_ICON,
    route: RoutesEnum.HOME,
    show: true,
  },
  {
    title: "Buy Crypto",
    icon: icons.CART_ICON,
    route: RoutesEnum.BUY_CRYPTO,
    show: false,
  },
  {
    title: "How it works",
    svg: "/works.svg",
    route: RoutesEnum.HOW_IT_WORKS,
    show: true,
  },
  {
    title: "Discover us",
    icon: "mdi-earth",
    route: RoutesEnum.DISCOVER,
    show: true,
  },
  {
    title: "Community",
    icon: icons.ACCOUNT_ICON_GROUP,
    route: RoutesEnum.COMMUNITY,
    show: true,
  },
  {
    title: "Company",
    icon: icons.OFFICE_BUILDING_ICON,
    route: RoutesEnum.COMPANY,
    show: true,
  },
  {
    title: "Blog",
    icon: "mdi-file-document",
    route: RoutesEnum.BLOG,
    show: true,
  },
  {
    title: "FAQ",
    icon: icons.FAQ_ICON,
    route: RoutesEnum.FAQ,
    show: true,
  },
  {
    title: "Contact",
    icon: icons.ACCOUNT_BOX_ICON,
    route: RoutesEnum.CONTACT,
    show: true,
  },
];
