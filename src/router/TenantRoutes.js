import AppBarCardLayout from '@/layouts/AppBarCardLayout.vue';
import AppBarSwitcherLayout from '@/layouts/AppBarSwitcherLayout.vue';
import IconGear from '@/assets/icons/gear.svg';

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
        title: 'My Account',
        action: {
          title: 'Settings',
          icon: IconGear,
          route: {
            name: 'AccountSettings'
          }
        }
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
  }
];
