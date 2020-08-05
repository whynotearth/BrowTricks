export const PMURoutes = [
  {
    path: '/tenant/:tenantSlug/pmu/form-setup',
    name: 'PMUFormSetup',
    component: () => import('@/views/PMUFormSetup.vue'),
    props: true,
    meta: { layout: () => import('@/layouts/WithTitleBarLayout.vue') }
  }
];
