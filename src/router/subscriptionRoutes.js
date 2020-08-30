export const SubscriptionRoutes = [
  {
    path: '/tenant/:tenantSlug/subscription',
    name: 'TenantSubscription',
    props: true,
    component: () => import('@/views/tenant/subscription/Index.vue'),
    meta: {
      requiresAuth: true
    }
  }
];
