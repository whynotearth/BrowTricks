export const clientRoutes = [
  {
    path: '/tenant/:tenantSlug/clients',
    name: 'ClientList',
    props: true,
    component: () => import('@/views/ClientList.vue'),
    meta: {
      isPublic: true
    }
  },
  {
    path: '/tenant/:tenantSlug/clients/add/:step',
    name: 'AddClient',
    props: true,
    component: () => import('@/views/ClientAddEdit.vue')
  },
  {
    path: '/tenant/:tenantSlug/clients/edit/:clientId',
    name: 'ClientDetail',
    props: true,
    component: () => import('@/views/ClientDetail.vue'),
    meta: {
      isPublic: true
    }
  },
  {
    path: '/tenant/:tenantSlug/clients/edit/:clientId/image-upload',
    name: 'ClientImageUpload',
    props: true,
    component: () => import('@/views/ClientImageUpload.vue'),
    // FIXME: TEMPORARY:
    meta: {
      isPublic: true
    }
  },
  {
    path: '/tenant/:tenantSlug/clients/edit/:clientId/video-upload',
    name: 'ClientVideoUpload',
    props: true,
    component: () => import('@/views/ClientVideoUpload.vue')
  },
  {
    path: '/tenant/:tenantSlug/clients/edit/:clientId/notifications',
    name: 'ClientNotifications',
    props: true,
    component: () => import('@/views/ClientNotifications.vue')
  }
];
