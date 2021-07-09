import { createRouter, createWebHistory } from 'vue-router';

export const routeList = [
  {
    path: '/workbench',
    redirect: '/workbench',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '',
        name: 'workbench',
        component: () => import('@/views/workbench/index.vue'),
      },
    ],
    meta: {
      title: '工作台',
      icon: 'icon-appstore',
      affix: true,
    },
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/welcome',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: 'welcome',
        name: 'welcome',
        component: () => import('@/views/dashboard/welcome/index.vue'),
        meta: { title: '欢迎页', affix: true },
      },
      {
        path: 'analysis',
        name: 'analysis',
        component: () => import('@/views/dashboard/analysis/index.vue'),
        meta: { title: '分析页', affix: true },
      },
      {
        path: 'monitor',
        name: 'monitor',
        component: () => import('@/views/dashboard/monitor/index.vue'),
        meta: { title: '监控页', affix: true },
      },
    ],
    meta: {
      title: '仪表盘',
      icon: 'icon-dashboard',
    },
  },
  {
    path: '/jump-url',
    redirect: '/workbench',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: 'router',
        name: 'router',
        component: () => import('@/views/jump-url/router/index.vue'),
        meta: { title: '路由' },
      },
      {
        path: 'github',
        name: 'github',
        link: 'https://github.com/BreadMage/bread-mage-template',
        meta: { title: '外链 Github' },
      },
    ],
    meta: {
      title: '跳转',
      icon: 'icon-link',
    },
  },
  {
    path: '/',
    redirect: '/workbench',
    hidden: true,
  },
  {
    path: '/:w+',
    redirect: '/',
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeList,
});

export default router;
