import AppBarCardLayout from '@/layouts/AppBarCardLayout.vue';
import AppBarSwitcherLayout from '@/layouts/AppBarSwitcherLayout.vue';

export const TenantPanelRoutes = [
  {
    path: '/account',
    name: 'HomeRedirector',
    props: true,
    component: () => import('@/views/HomeRedirector.vue'),
    meta: {
      layout: AppBarCardLayout,
      appBar: { title: 'Home' }
    }
  },
  {
    path: '/tenant/:tenantSlug/account',
    name: 'MyAccount',
    props: true,
    component: () => import('@/views/MyAccount.vue'),
    meta: {
      layout: AppBarSwitcherLayout,
      appBar: { title: 'My Account' }
    }
  },
  {
    // first step: /sign-up/business-info
    // TODO: change to /signup/:step
    path: '/sign-up/:step',
    name: 'TenantSignup',
    props: true,
    component: () => import('@/views/TenantSignup.vue'),
    meta: {
      layout: () => import('@/layouts/TenantLayout.vue'),
      needsUserInfo: true
    }
  },
  {
    path: '/tenant/:tenantSlug',
    name: 'TenantHome',
    props: true,
    component: () => import('@/views/TenantHome.vue')
  },
  {
    path: '/tenant/:tenantSlug/account/edit',
    name: 'AccountInfoEdit',
    props: true,
    component: () => import('@/views/AccountInfoEdit.vue'),
    meta: {
      layout: AppBarCardLayout,
      appBar: {
        title: 'Edit Account',
        backRoute: { name: 'MyAccount' }
      }
    }
  }
];
