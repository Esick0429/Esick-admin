import router from "./index";
import { getLocalStorage, removeLocalStorage } from "@/utils/localStorage";
import { whiteList } from "@/config/white-list";
import { ElMessage } from "element-plus";

router.beforeEach(async (to, _from, next) => {
  // 判断该用户是否登录
  if (getLocalStorage("token")) {
    console.log(123);

    if (to.path === "/login") {
      // 如果已经登录，并准备进入 Login 页面，则重定向到主页
      next({ path: "/" });
    } else {
      // 检查用户是否已获得其权限角色
      const authority = getLocalStorage("authority");
      if (to.meta.Auth) {
        try {
          authority ? next() : router.push("403");
          next({ ...to, replace: true });
        } catch (err: any) {
          // 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
          removeLocalStorage("token");
          ElMessage.error(err.message || "路由守卫过程发生错误");
          next("/login");
        }
      } else {
        next();
      }
    }
  } else {
    // 如果没有 Token
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果在免登录的白名单中，则直接进入
      next();
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面
      next("/login");
    }
  }
});
