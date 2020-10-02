import AppBarCardLayout from '@/layouts/AppBarCardLayout.vue';
import AppBarSwitcherLayout from '@/layouts/AppBarSwitcherLayout.vue';

export const TenantPanelRoutes = [
  {
    path: '/panel-redirecting',
    name: 'PanelRedirector',
    props: true,
    component: () => import('@/views/PanelRedirector.vue'),
    meta: {
      layout: AppBarCardLayout,
      noNavigation: true
    }
  },
  {
    path: '/tenant/:tenantSlug',
    name: 'TenantHome',
    props: true,
    component: () => import('@/views/TenantHome.vue'),
    meta: {
      layout: AppBarCardLayout,
      pageBackground: 'bg-background',
      appBar: { title: 'Brow Tricks', noHeader: true }
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
