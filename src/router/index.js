import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  {
    path: '/login',
    name: '用户登陆',
    meta: { title: '用户登陆', icon: 'example' },
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: false,
    meta: { title: '首页', icon: 'search' },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/search/index'),
        meta: { title: '首页', icon: 'search' }
      }
    ]
  },
  {
    path: '/record',
    component: Layout,
    redirect: '/record/index',
    name: '生活记录',
    meta: { title: '生活记录', icon: 'documentation' },
    children: [
      {
        path: 'accounting',
        component: () => import('@/views/record/index'),
        meta: { title: '生活记录', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/bookmark',
    component: Layout,
    redirect: '/bookmark/index',
    name: 'URL书签',
    meta: { title: 'URL书签', icon: 'documentation' },
    children: [
      {
        path: '/bookmark',
        name: '123',
        component: () => import('@/views/bookmark/index'),
        meta: { title: 'URL书签', icon: 'documentation' }
      },
      {
        path: '/test',
        name: '456',
        component: () => import('@/views/bookmark/test'),
        meta: { title: '测试vue页面', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/note',
    component: Layout,
    redirect: '/note/index',
    name: '学习笔记1',
    meta: { title: '学习笔记1222', icon: 'documentation' },
    children: [
      {
        path: 'backEnd',
        name: '后端',
        component: () => import('@/views/note/back'),
        meta: { title: '后端', icon: 'documentation' }
      },
      {
        path: 'frontEnd',
        name: '前端',
        component: () => import('@/views/note/front'),
        meta: { title: '前端', icon: 'documentation' }
      },
      {
        path: 'others',
        name: '其他',
        component: () => import('@/views/note/others'),
        meta: { title: '其他', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/curriculumVitae',
    component: Layout,
    redirect: '/curriculumVitae/index',
    name: '个人简历',
    meta: { title: '个人简历', icon: 'documentation' },
    children: [
      {
        path: 'cv',
        component: () => import('@/views/curriculumVitae/cv'),
        meta: { title: '个人简历', icon: 'documentation' }
      }
    ]
  }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
