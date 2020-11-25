export const SubscriptionRoutes = [
  {
    path: '/tenant/:tenantSlug/subscription',
    name: 'TenantSubscription',
    props: true,
    component: () => import('@/views/tenant/subscription/Index.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tenant/:tenantSlug/setupTest',
    name: 'SetupSubscription',
    props: true,
    component: () => import('@/views/tenant/subscription/setupSubscription.vue'),
    meta: {
      requiresAuth: true
    }
  }
];
