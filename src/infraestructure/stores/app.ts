import { defineStore } from "pinia";
import { RoutesEnum } from "@/domain/enums/routes.enum";

export const useAppStore = defineStore("app", {
  state: () =>
    <
      {
        activePage: string;
        pageIcon: string;
        sidebarCollapsed: boolean;
      }
    >{
      activePage: RoutesEnum.DISCOVER,
      pageIcon: "mdi-home",
      sidebarCollapsed: false,
    },
  actions: {
    setActivePage(page: string) {
      this.activePage = page;
    },
    setPageIcon(icon: string) {
      this.pageIcon = icon;
    },
    setSidebarCollapsed(collapsed: boolean) {
      this.sidebarCollapsed = collapsed;
    },
  },
  getters: {
    getActivePage(): string {
      return this.activePage;
    },
    getPageIcon(): string {
      return this.pageIcon;
    },
    getSidebarCollapsed(): boolean {
      return this.sidebarCollapsed;
    },
  },
});
