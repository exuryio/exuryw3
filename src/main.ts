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

//google
import vue3GoogleLogin from 'vue3-google-login'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';
const app = createApp(App);
const head = createHead();

registerPlugins(app);
app.use(head);
app.use(PerfectScrollbarPlugin);
app.mount("#app");
app.use(vue3GoogleLogin, {  clientId: '352765913521-fvm83et7mf3tsnal92pve2s42g5mpjbl.apps.googleusercontent.com '})
