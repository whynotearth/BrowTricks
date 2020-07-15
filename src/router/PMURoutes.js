export const PMURoutes = [
  {
    path: '/pmu/form-setup',
    name: 'PMUFormSetup',
    component: () => import('@/views/PMUFormSetup.vue'),
    meta: { layout: () => import('@/layouts/WithTitleBarLayout.vue') }
  },
  {
    path: '/pmu/flow-options',
    name: 'PMUFlowOptions',
    component: () => import('@/views/PMUFlowOptions.vue'),
    meta: { layout: () => import('@/layouts/WithTitleBarLayout.vue') }
  },
  {
    path: '/pmu/flow-questions',
    name: 'PMUFlowQuestions',
    component: () => import('@/views/PMUFlowQuestions.vue')
  }
];
