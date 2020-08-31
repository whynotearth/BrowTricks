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
    path: '/tenant/:tenantSlug/subscriptions',
    name: 'ManageSubscriptions',
    props: true,
    component: () => import('@/views/ManageSubscriptions.vue'),
    meta: {
      layout: WithTitleBarLayout,
      title: 'Subscription Management',
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
    path: '/tenant/:tenantSlug/clients/:clientId',
    name: 'Client',
    redirect: { name: 'ClientEdit' },
    props: true,
    component: () => import('@/views/Client.vue'),
    meta: {
      layout: WithTitleBarLayout,
      noNavigation: true,
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
          backRoute: { name: 'ClientList' }
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
        path: 'pmu-sign-methods',
        name: 'PmuSignMethods',
        props: true,
        component: () => import('@/views/PmuSignMethods.vue'),
        meta: {
          layout: WithTitleBarLayout,
          title: 'PMU Form Sign',
          backRoute: { name: 'ClientEdit' }
        }
      },
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
        path: 'notes',
        name: 'ClientNotes',
        component: () => import('@/views/ClientNotes.vue'),
        props: true,
        meta: {
          layout: WithTitleBarLayout,
          title: 'Notes',
          backRoute: { name: 'ClientEdit' }
        }
      }
    ]
  }
];
