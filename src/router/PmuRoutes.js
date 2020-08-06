export const PmuRoutes = [
  // TODO: we can use child route (parent: client detail route)
  {
    path: '/tenant/:tenantSlug/client/:clientId/pmu-sign',
    name: 'PmuSign',
    component: () => import('@/views/PmuSign.vue'),
    props: true,
    meta: {
      layout: () => import('@/layouts/WithTitleBarLayout.vue'),
      backRoute: { name: 'ClientDetail' },
      title: 'PMU Form Sign'
    }
  }
];
