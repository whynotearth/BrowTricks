import WithTitleBarLayout from '@/layouts/WithTitleBarLayout.vue';

export const clientRoutes = [
  {
    path: '/tenant/:tenantSlug/clients',
    name: 'ClientList',
    props: true,
    component: () => import('@/views/ClientList.vue'),
    meta: {
      layout: WithTitleBarLayout,
      title: 'Clients',
      backRoute: { name: 'TenantHome' }
    }
  },
  {
    path: '/tenant/:tenantSlug/clients/add/:step',
    name: 'AddClient',
    props: true,
    component: () => import('@/views/ClientAddEdit.vue')
  },
  {
    path: '/tenant/:tenantSlug/upload',
    name: 'ClientUpload',
    props: true,
    component: () => import('@/views/ClientUpload.vue'),
    meta: {
      noNavigation: true,
      layout: WithTitleBarLayout,
      title: 'Upload',
      backRoute: { name: 'TenantHome' }
    }
  },
  {
    path: '/tenant/:tenantSlug/clients/:clientId',
    name: 'Client',
    props: true,
    component: () => import('@/views/Client.vue'),
    meta: {
      layout: WithTitleBarLayout,
      title: 'Client Profile',
      backRoute: { name: 'ClientList' }
    },
    children: [
      {
        path: 'edit',
        name: 'ClientEdit',
        props: true,
        component: () => import('@/views/ClientEdit.vue'),
        meta: {
          layout: WithTitleBarLayout,
          title: 'Client Profile',
          backRoute: { name: 'ClientList' },
          menuItems: [
            { itemName: 'Pmu', routeName: 'PmuSign' },
            { itemName: 'Notes', routeName: 'ClientNotes' }
          ]
        }
      },
      {
        path: 'uploads',
        name: 'ClientUploads',
        props: true,
        component: () => import('@/views/ClientUploads.vue'),
        meta: {
          layout: WithTitleBarLayout,
          title: 'Uploads',
          backRoute: { name: 'ClientEdit' }
        }
      },
      {
        path: 'uploads/:mediaIndex',
        name: 'ClientUploadsItem',
        props: true,
        component: () => import('@/views/ClientUploads.vue'),
        meta: {
          layout: WithTitleBarLayout,
          title: 'Uploads',
          backRoute: { name: 'ClientUploads' }
        }
      },
      {
        path: 'notifications',
        name: 'ClientNotifications',
        props: true,
        component: () => import('@/views/ClientNotifications.vue'),
        meta: {
          layout: WithTitleBarLayout,
          title: 'Notifications',
          backRoute: { name: 'ClientEdit' }
        }
      },

      // PMU
      {
        path: 'pmu-sign',
        name: 'PmuSign',
        component: () => import('@/views/PmuSign.vue'),
        props: true,
        meta: {
          layout: WithTitleBarLayout,
          title: 'PMU Form Sign',
          backRoute: { name: 'ClientEdit' }
        }
      },
      {
        path: 'pmu-sign-from-notify',
        name: 'PmuSignFromNotify',
        component: () => import('@/views/PmuSign.vue'),
        props: true,
        meta: {
          isPublic: true,
          layout: WithTitleBarLayout,
          title: 'PMU Form Sign',
          backRoute: { name: 'ClientEdit' }
        }
      },
      {
        // sign flow
        path: 'pmu-sign/flow/:stepSlug',
        name: 'PMUFlowQuestions',
        component: () => import('@/views/PmuSignFlow.vue'),
        props: true
      },
      {
        path: 'notes',
        name: 'ClientNotes',
        component: () => import('@/views/ClientNotes.vue'),
        props: true,
        meta: {
          layout: WithTitleBarLayout,
          title: 'Notes',
          backRoute: { name: 'ClientEdit' }
        }
      },
      {
        path: 'client-info-edit',
        name: 'ClientInfoEdit',
        component: () => import('@/views/ClientInfoEdit.vue'),
        props: true,
        meta: {
          layout: WithTitleBarLayout,
          title: 'Edit Client Info',
          backRoute: { name: 'ClientEdit' }
        }
      }
    ]
  }
];
