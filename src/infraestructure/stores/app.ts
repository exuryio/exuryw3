import { defineStore } from "pinia";
import { RoutesEnum } from "@/domain/enums/routes.enum";

export const useAppStore = defineStore("app", {
  state: () =>
    <
      {
        activePage: string;
        pageIcon: string;
      }
    >{
      activePage: RoutesEnum.DISCOVER,
      pageIcon: "mdi-home",
    },
  actions: {
    setActivePage(page: string) {
      this.activePage = page;
    },
    setPageIcon(icon: string) {
      this.pageIcon = icon;
    },
  },
  getters: {
    getActivePage(): string {
      return this.activePage;
    },
    getPageIcon(): string {
      return this.pageIcon;
    },
  },
});
