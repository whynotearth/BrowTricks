export const PMURoutes = [
  {
    path: '/pmu/form-setup',
    name: 'PMUFormSetup',
    component: () => import('@/views/PMUFormSetup.vue'),
    meta: { layout: () => import('@/layouts/WithTitleBarLayout.vue') }
  }
];
