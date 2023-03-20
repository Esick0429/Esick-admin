import {
  type RouteRecordRaw,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
const Layout = () => import("@/layout/index.vue")
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  // {
  //   path: "/403",
  //   component: () => import("@/views/error-page/403.vue"),
  //   meta: {
  //     hidden: true
  //   }
  // },
  // {
  //   path: "/404",
  //   component: () => import("@/views/error-page/404.vue"),
  //   meta: {
  //     hidden: true
  //   },
  //   alias: "/:pathMatch(.*)*"
  // },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layout,
    redirect: "/blog",
    children: [
      {
        path: "blog",
        component: () => import("@/views/blog/index.vue"),
        name: "blog",
        meta: {
          title: "首页",
          svgIcon: "dashboard",
          affix: true,
          hideclose: true
        }
      }
    ]
  },
    {
    path: "/diary",
    component: Layout,
    redirect: "/diary/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/diary/index.vue"),
        name: "diary",
        meta: {
          title: "日记",
          svgIcon: "diary"
        }
      }
    ]
  },
  // {
  //   path: "/unocss",
  //   component: Layout,
  //   redirect: "/unocss/index",
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/views/unocss/index.vue"),
  //       name: "UnoCSS",
  //       meta: {
  //         title: "unocss",
  //         svgIcon: "unocss"
  //       }
  //     }
  //   ]
  // },
  {
    path: "/link",
    component: Layout,
    children: [
      {
        path: "https://juejin.cn/post/7089377403717287972",
        component: () => {},
        name: "Link",
        meta: {
          title: "外链",
          svgIcon: "link"
        }
      }
    ]
  },
  // {
  //   path: "/table",
  //   component: Layout,
  //   redirect: "/table/element-plus",
  //   name: "Table",
  //   meta: {
  //     title: "表格",
  //     elIcon: "Grid"
  //   },
  //   children: [
  //     {
  //       path: "element-plus",
  //       component: () => import("@/views/table/element-plus/index.vue"),
  //       name: "ElementPlus",
  //       meta: {
  //         title: "Element Plus",
  //         keepAlive: true
  //       }
  //     },
  //   ]
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes, // `routes: routes` 的缩写
});
export default router