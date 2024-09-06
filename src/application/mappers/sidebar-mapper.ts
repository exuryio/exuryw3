import { SIDEBAR_LINKS } from "@/domain/constants/sidebar.constant";

export const linksToShow = SIDEBAR_LINKS.filter((link) => link.show);
