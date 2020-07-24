export const clientRoutes = [
  {
    path: '/tenant/:tenantSlug/clients',
    name: 'ClientList',
    props: true,
    component: () => import('@/views/ClientList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tenant/:tenantSlug/clients/add/:step',
    name: 'AddClient',
    props: true,
    component: () => import('@/views/ClientAddEdit.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tenant/:tenantSlug/clients/edit/:clientId',
    name: 'ClientDetail',
    props: true,
    component: () => import('@/views/ClientDetail.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tenant/:tenantSlug/clients/edit/:clientId/image-upload',
    name: 'ClientImageUpload',
    props: true,
    component: () => import('@/views/ClientImageUpload.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tenant/:tenantSlug/clients/edit/:clientId/notifications',
    name: 'ClientNotifications',
    props: true,
    component: () => import('@/views/ClientNotifications.vue'),
    meta: {
      requiresAuth: true
    }
  }
];
