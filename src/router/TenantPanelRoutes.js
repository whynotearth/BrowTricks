export const TenantPanelRoutes = [
  {
    path: '/tenant/:tenantSlug',
    name: 'TenantHome',
    props: true,
    component: () => import('@/views/TenantHome.vue')
  },
  {
    path: '/tenant/:tenantSlug/home',
    name: 'ShopHome',
    props: true,
    component: () => import('@/views/Home.vue'),
    meta: { isPublic: true }
  },
  {
    path: '/setting/:tenantSlug/account',
    name: 'MyAccount',
    props: true,
    meta: {
      layout: () => import('@/layouts/WithNameBarLayout.vue'),
      title: 'My Account'
    }
  },
  {
    // tenant pmu setup
    path: '/tenant/:tenantSlug/pmu-setup',
    name: 'TenantPmuSetup',
    component: () => import('@/views/TenantPmuSetup.vue'),
    props: true,
    meta: {
      layout: () => import('@/layouts/WithTitleBarLayout.vue'),
      title: 'PMU Form Setup',
      backRoute: { name: 'TenantHome' }
    }
  },
  {
    path: '/setting/:tenantSlug/edit-account',
    name: 'AccountInfoEdit',
    props: true,
    component: () => import('@/views/AccountInfoEdit.vue'),
    meta: {
      layout: () => import('@/layouts/WithTitleBarLayout.vue'),
      title: 'Edit Account',
      backRoute: { name: 'MyAccount' }
    }
  }
];
