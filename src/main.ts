import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import router from "./router";
import "@/router/permission";
import "@/styles/index.scss";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus, { size: "large", zIndex: 3000, locale: zhCn });
app.use(router);

app.mount("#app");
