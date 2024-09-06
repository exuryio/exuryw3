/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

import App from "./App.vue";

import { createApp } from "vue";
import { createHead } from "@unhead/vue";
const app = createApp(App);
const head = createHead();

registerPlugins(app);
app.use(head);
app.mount("#app");
