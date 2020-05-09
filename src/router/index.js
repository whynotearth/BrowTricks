import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/shop/test-tenant-slug',
    name: 'CustomerHome',
    component: () => import('@/views/CustomerHome.vue')
  },
  {
    path: '/shop/test-tenant-slug/business-hours',
    name: 'CustomerBusinessHours',
    component: () => import('@/views/CustomerBusinessHours.vue')
  },
  {
    path: '/shop/test-tenant-slug/contact',
    name: 'CustomerContact',
    component: () => import('@/views/CustomerContact.vue')
  },
  {
    path: '/',
    redirect: { name: 'CustomerHome' }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
