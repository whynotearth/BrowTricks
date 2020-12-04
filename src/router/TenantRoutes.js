import AppBarCardLayout from '@/layouts/AppBarCardLayout.vue';
import AppBarSwitcherLayout from '@/layouts/AppBarSwitcherLayout.vue';

export const TenantPanelRoutes = [
  {
    path: '/tenant/:tenantSlug',
    name: 'TenantHome',
    props: true,
    component: () => import('@/views/TenantHome.vue'),
    meta: {
      layout: AppBarCardLayout,
      pageBackground: 'bg-background',
      title: 'Home',
      appBar: { noHeader: true }
    }
  },
  {
    path: '/tenant/:tenantSlug/intro',
    name: 'TenantIntro',
    props: true,
    component: () => import('@/views/TenantIntro.vue'),
    meta: {
      layout: AppBarCardLayout,
      appBar: { noHeader: true }
    }
  },
  {
    path: '/tenant/:tenantSlug/account',
    name: 'Account',
    props: true,
    component: () => import('@/views/Account.vue'),
    meta: {
      layout: AppBarSwitcherLayout,
      appBar: {
        title: 'My Account'
      }
    }
  },
  {
    path: '/tenant/:tenantSlug/account/settings',
    name: 'AccountSettings',
    props: true,
    component: () => import('@/views/AccountSettings.vue'),
    meta: {
      layout: AppBarCardLayout,
      appBar: {
        title: 'Settings',
        backRoute: { name: 'Account' }
      }
    }
  },
  {
    path: '/tenant/:tenantSlug/account/manage',
    name: 'AccountManage',
    props: true,
    component: () => import('@/views/AccountManage.vue'),
    meta: {
      layout: AppBarCardLayout,
      appBar: {
        title: 'Manage Account',
        backRoute: { name: 'AccountSettings' }
      }
    }
  },
  {
    path: '/tenant-signup',
    name: 'TenantSignup',
    props: true,
    component: () => import('@/views/TenantSignup.vue'),
    meta: {
      noNavigation: true,
      layout: AppBarCardLayout,
      pageBackground: 'bg-background',
      needsUserInfo: true,
      appBar: {
        title: 'Create Business Profile'
      }
    }
  }
];
