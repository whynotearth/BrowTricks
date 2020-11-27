export const SubscriptionRoutes = [
  {
    path: '/tenant/:tenantSlug/subscription',
    name: 'TenantSubscription',
    props: true,
    component: () => import('@/views/tenant/subscription/SubscriptionIndex.vue')
  },
  {
    path: '/tenant/:tenantSlug/setupTest',
    name: 'SetupSubscription',
    props: true,
    component: () => import('@/views/tenant/subscription/setupSubscription.vue')
  }
];
