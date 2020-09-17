import WithTitleBarLayout from '@/layouts/WithTitleBarLayout.vue';
import IconPlus from '@/assets/icons/plus.svg';

export const clientRoutes = [
  {
    path: '/tenant/:tenantSlug/clients',
    name: 'ClientList',
    props: true,
    component: () => import('@/views/ClientList.vue'),
    meta: {
      layout: WithTitleBarLayout,
      layoutAction: {
        title: 'Add Client',
        icon: IconPlus,
        route: {
          name: 'AddClient',
          params: { step: 'basic-info' }
        }
      },
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
      title: 'Portfolio Upload',
      backRoute: { name: 'TenantHome' }
    }
  },
  {
    path: '/tenant/:tenantSlug/clients/:clientId',
    name: 'Client',
    props: true,
    component: () => import('@/views/Client.vue'),
    redirect: { name: 'ClientEdit' },
    meta: {
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
        path: 'pmu-sign/select-template',
        name: 'PmuSignTemplateSelector',
        component: () => import('@/views/PmuSignTemplateSelector.vue'),
        props: true,
        meta: {
          layout: WithTitleBarLayout,
          title: 'Form Templates',
          backRoute: { name: 'ClientEdit' }
        }
      },

      {
        path: 'pmu-sign/:templateId/choose-method',
        name: 'PmuSignPreview',
        component: () => import('@/views/PmuSignPreview.vue'),
        props: true,
        meta: {
          layout: WithTitleBarLayout,
          title: 'PMU Form Sign',
          backRoute: { name: 'ClientEdit' }
        }
      },
      {
        path: 'pmu-form-download/:templateId',
        name: 'PmuFormDownload',
        component: () => import('@/views/PmuFormDownload.vue'),
        props: true,
        meta: {
          noNavigation: true,
          layout: WithTitleBarLayout,
          title: 'PMU Form Download'
        }
      },
      // flow (From Notification)
      {
        path: 'pmu-sign-fn/:templateId/flow',
        name: 'PmuSignFromNotify',
        component: () => import('@/views/PmuSignFlow.vue'),
        props: true,
        meta: {
          isPublic: true,
          title: 'PMU Form Sign',
          backRoute: { name: 'ClientEdit' }
        }
      },
      {
        // flow (No SMS)
        path: 'pmu-sign/:templateId/flow',
        name: 'PmuSignFlow',
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
