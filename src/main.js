import { createApp } from "vue";
import App from "./App.vue";
import router from "./data/router/index";

createApp(App).use(router).mount("#app");
