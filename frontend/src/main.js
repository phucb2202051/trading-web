import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./core/router";
import "./style.css";

const app = createApp(App); // ✅ tạo app trước

const pinia = createPinia();

app.use(pinia);   // ✅ gắn pinia
app.use(router);  // ✅ gắn router

app.mount("#app"); // ✅ mount cuối cùng