import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

import Layout from "../views/layout/Layout"

export const constantRouterMap = [
  {
    path: "/login",
    name: "用户登陆",
    meta: { title: "用户登陆", icon: "example" },
    component: () => import("@/views/login/index"),
    hidden: true
  },
  { path: "/404", component: () => import("@/views/404"), hidden: true },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    name: "Dashboard",
    hidden: false,
    meta: { title: "首页",icon: 'search'},
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/search/index"),
        meta: { title: "首页",icon: 'search'}
      }
    ]
  },
  {
    path: "/record",
    component: Layout,
    redirect: "/record/index",
    name: "生活记录",
    meta: { title: "生活记录",icon: 'documentation'},
    children: [
      {
        path: "accounting",
        component: () => import("@/views/record/index"),
        meta: { title: "生活记录",icon:'documentation'}
      }
    ]
  },
  {
    path: '/bookmark',
    component: Layout,
    redirect: '/bookmark/index',
    name: '网络URL书签',
    mata: {
      title: '网络URL书签',
      icon: 'documentation'
    },
    children: [
      {
        path: '/bookmark',
        component: () => import('@/views/bookmark/index'),
        meta: { title: 'URL书签', icon: 'documentation' }
      }
    ]
  },
  {
    path: "/note",
    component: Layout,
    redirect: "/note/index",
    name: "学习笔记",
    meta: { title: "学习笔记",icon: 'documentation'},
    children: [
      {
        path: "backEnd",
        name: "后端",
        component: () => import("@/views/note/back"),
        meta: { title: "后端",icon:'documentation'}
      },
      {
        path: "frontEnd",
        name: "前端",
        component: () => import("@/views/note/front"),
        meta: { title: "前端",icon:'documentation'}
      },
      {
        path: "others",
        name: "其他",
        component: () => import("@/views/note/others"),
        meta: { title: "其他",icon:'documentation'}
      }
    ]
  },
  {
    path: "/curriculumVitae",
    component: Layout,
    redirect: "/curriculumVitae/index",
    name: "个人简历",
    meta: { title: "个人简历",icon: 'documentation'},
    children: [
      {
        path: "cv",
        component: () => import("@/views/curriculumVitae/cv"),
        meta: { title: "个人简历",icon:'documentation'}
      }
    ]
  },
  // {
  //   path: "/game",
  //   component: Layout,
  //   redirect: "/game/index",
  //   name: "游戏专栏",
  //   meta: { title: "游戏专栏",icon: 'star'},
  //   children: [
  //     {
  //       path: "gba",
  //       name: "GBA",
  //       component: () => import("@/views/game/gba"),
  //       meta: { title: "GBA",icon: 'star'}
  //     },
  //     {
  //       path: "nds",
  //       name: "NDS",
  //       component: () => import("@/views/game/nds"),
  //       meta: { title: "NDS",icon: 'star'}
  //     }
  //   ]
  // },
  // {
  //   path: "/statistics/daily",
  //   component: Layout,
  //   redirect: "/statistics/daily/create",
  //   name: "Statistics",
  //   meta: { title: "统计分析",icon: 'chart'},
  //   children: [
  //     {
  //       path: "create",
  //       name: "StatisticsDailyCreate",
  //       component: () => import("@/views/statistics/daily/create"),
  //       meta: { title: "生成统计"}
  //     },
  //     {
  //       path: "chart",
  //       name: "StatisticsDayChart",
  //       component: () => import("@/views/statistics/daily/chart"),
  //       meta: { title: "统计图表"}
  //     }
  //   ]
  // },
  // {
  //   path: '/course',
  //   component: Layout,
  //   redirect: '/course/list',
  //   name: 'Course',
  //   meta: { title: '课程管理', icon: 'form'},
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'EduCourseList',
  //       component: () => import('@/views/course/list'),
  //       meta: { title: '课程列表' }
  //     },
  //     {
  //       path: 'info',
  //       name: 'EduCourseInfo',
  //       component: () => import('@/views/course/info'),
  //       meta: { title: '发布课程' }
  //     },
  //     {
  //       path: 'info/:id',
  //       name: 'EduCourseInfoEdit',
  //       component: () => import('@/views/course/info'),
  //       meta: { title: '编辑课程基本信息', noCache: true },
  //       hidden: true
  //     },
  //     {
  //       path: 'chapter/:id',
  //       name: 'EduCourseChapterEdit',
  //       component: () => import('@/views/course/chapter'),
  //       meta: { title: '编辑课程大纲', noCache: true },
  //       hidden: true
  //     },
  //     {
  //       path: 'publish/:id',
  //       name: 'EduCoursePublishEdit',
  //       component: () => import('@/views/course/publish'),
  //       meta: { title: '发布课程', noCache: true },
  //       hidden: true
  //     }
  //   ]
  // },
  { path: "*", redirect: "/404", hidden: true }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
