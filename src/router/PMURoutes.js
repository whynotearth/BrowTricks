export const PmuRoutes = [
  {
    path: '/tenant/:tenantSlug/client/:clientId/pmu-sign',
    name: 'PmuSign',
    component: () => import('@/views/PmuSign.vue'),
    props: true,
    meta: { layout: () => import('@/layouts/WithTitleBarLayout.vue') }
  }
];
