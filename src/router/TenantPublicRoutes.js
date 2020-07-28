export const TenantPublicRoutes = [
  {
    path: '/shop/:tenantSlug',
    name: 'CustomerHome',
    component: () => import('@/views/CustomerHome.vue'),
    meta: {
      isPublic: true
    }
  },
  {
    path: '/shop/:tenantSlug/business-hours',
    name: 'CustomerBusinessHours',
    component: () => import('@/views/CustomerBusinessHours.vue'),
    meta: {
      isPublic: true
    }
  },
  {
    path: '/shop/:tenantSlug/contact',
    name: 'CustomerContact',
    component: () => import('@/views/CustomerContact.vue'),
    meta: {
      isPublic: true
    }
  },
  {
    path: '/shop/:tenantSlug/categories',
    name: 'CustomerCategories',
    component: () => import('@/views/CustomerCategories.vue'),
    meta: {
      isPublic: true
    }
  }
];
