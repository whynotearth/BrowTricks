export const PMURoutes = [
  {
    path: '/tenant/:tenantSlug/pmu/form-setup',
    name: 'PMUFormSetup',
    component: () => import('@/views/PMUFormSetup.vue'),
    props: true,
    meta: { layout: () => import('@/layouts/WithTitleBarLayout.vue') }
  },
  {
    // needs clientId?
    path: '/tenant/:tenantSlug/client/:clientId/pmu/flow-methods',
    name: 'PMUFlowMethods',
    component: () => import('@/views/PMUFlowMethods.vue'),
    meta: { layout: () => import('@/layouts/WithTitleBarLayout.vue') }
  },
  {
    path: '/tenant/:tenantSlug/client/:clientId/pmu/questions-intro',
    name: 'PMUFlowStart',
    component: () => import('@/views/PMUFlowStart.vue')
  },
  {
    path: '/tenant/:tenantSlug/client/:clientId/pmu/flow-questions/:stepSlug',
    name: 'PMUFlowQuestions',
    component: () => import('@/views/PMUFlowQuestions.vue'),
    props: true
  }
];
