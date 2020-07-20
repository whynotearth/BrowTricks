export const PMURoutes = [
  {
    path: '/pmu/form-setup',
    name: 'PMUFormSetup',
    component: () => import('@/views/PMUFormSetup.vue'),
    meta: { layout: () => import('@/layouts/WithTitleBarLayout.vue') }
  },
  {
    path: '/pmu/flow-methods',
    name: 'PMUFlowMethods',
    component: () => import('@/views/PMUFlowMethods.vue'),
    meta: { layout: () => import('@/layouts/WithTitleBarLayout.vue') }
  },
  {
    path: '/pmu/flow-start',
    name: 'PMUFlowStart',
    component: () => import('@/views/PMUFlowStart.vue')
  },
  {
    path: '/pmu/flow-questions/:step',
    name: 'PMUFlowQuestions',
    component: () => import('@/views/PMUFlowQuestions.vue')
  }
];
