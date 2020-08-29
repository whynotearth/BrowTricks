import WithTitleBarLayout from '@/layouts/WithTitleBarLayout.vue';

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
    // tenant pmu setup
    path: '/tenant/:tenantSlug/pmu-setup',
    name: 'TenantPmuSetup',
    component: () => import('@/views/TenantPmuSetup.vue'),
    props: true,
    meta: {
      layout: WithTitleBarLayout,
      title: 'PMU Form Setup',
      backRoute: { name: 'TenantHome' }
    }
  }
];
