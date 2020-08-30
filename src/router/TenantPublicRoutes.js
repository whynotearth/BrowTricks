export const TenantPublicRoutes = [
  // TODO: needs review
  {
    path: '/shop/:tenantSlug/business-hours',
    name: 'CustomerBusinessHours',
    component: () => import('@/views/CustomerBusinessHours.vue'),
    meta: {
      isPublic: true
    }
  },
  // TODO: needs review
  {
    path: '/shop/:tenantSlug/contact',
    name: 'CustomerContact',
    component: () => import('@/views/CustomerContact.vue'),
    meta: {
      isPublic: true
    }
  },
  // TODO: needs review
  {
    path: '/shop/:tenantSlug/categories',
    name: 'CustomerCategories',
    component: () => import('@/views/CustomerCategories.vue'),
    meta: {
      isPublic: true
    }
  }
];
