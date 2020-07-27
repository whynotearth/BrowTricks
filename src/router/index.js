import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import { authRoutes } from './authRoutes';
import { PMURoutes } from './PMURoutes';
import { clientRoutes } from './clientRoutes';

Vue.use(VueRouter);

const routes = [
  ...PMURoutes,
  // test routes
  {
    path: '/test-layout-splash',
    name: 'TestLayoutSplash',
    component: () => import('@/views/TestLayoutSplash.vue'),
    meta: {
      isPublic: true
    }
  },
  {
    path: '/test-layout-splash-with-header',
    name: 'TestLayoutSplashWithHeader',
    component: () => import('@/views/TestLayoutSplashWithHeader.vue'),
    meta: {
      isPublic: true
    }
  },
  {
    path: '/shop/test-tenant-94',
    name: 'CustomerHome',
    component: () => import('@/views/CustomerHome.vue'),
    meta: {
      isPublic: true
    }
  },
  {
    path: '/shop/test-tenant-94/business-hours',
    name: 'CustomerBusinessHours',
    component: () => import('@/views/CustomerBusinessHours.vue'),
    meta: {
      isPublic: true
    }
  },
  {
    path: '/shop/test-tenant-94/contact',
    name: 'CustomerContact',
    component: () => import('@/views/CustomerContact.vue'),
    meta: {
      isPublic: true
    }
  },
  {
    path: '/shop/test-tenant-94/categories',
    name: 'CustomerCategories',
    component: () => import('@/views/CustomerCategories.vue'),
    meta: {
      isPublic: true
    }
  },
  ...clientRoutes,
  ...authRoutes,
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

router.beforeEach((to, from, next) => {
  if (to.meta.isPublic) {
    if (to.meta.needsUserInfo) {
      store.dispatch('auth/ping').catch(() => {
        console.log('Not authenticated');
      });
    }
    next();
  } else {
    store
      .dispatch('auth/ping')
      .then(response => {
        const isAuthenticated = response && response.isAuthenticated;
        if (isAuthenticated) {
          next();
        } else {
          next({ name: 'Welcome' });
        }
      })
      .catch(() => {
        console.log('Not authenticated');
        next({ name: 'Welcome' });
      });
  }
});

export default router;
