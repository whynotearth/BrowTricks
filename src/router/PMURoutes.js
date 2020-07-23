export const PMURoutes = [
  {
    path: '/tenant/:tenantSlug/pmu/form-setup',
    name: 'PMUFormSetup',
    component: () => import('@/views/PMUFormSetup.vue'),
    meta: { layout: () => import('@/layouts/WithTitleBarLayout.vue') }
  },
  {
    path: '/tenant/:tenantSlug/pmu/flow-methods',
    name: 'PMUFlowMethods',
    component: () => import('@/views/PMUFlowMethods.vue'),
    meta: { layout: () => import('@/layouts/WithTitleBarLayout.vue') }
  },
  {
    path: '/tenant/:tenantSlug/pmu/flow-start',
    name: 'PMUFlowStart',
    component: () => import('@/views/PMUFlowStart.vue')
  },
  {
    path: '/tenant/:tenantSlug/pmu/flow-questions/:step',
    name: 'PMUFlowQuestions',
    component: () => import('@/views/PMUFlowQuestions.vue')
  }
];
