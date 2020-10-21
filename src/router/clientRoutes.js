import AppBarLayout from '@/layouts/AppBarCardLayout.vue';
import IconEdit from '@/assets/icons/edit.svg';

export const clientRoutes = [
  {
    path: '/tenant/:tenantSlug/clients',
    name: 'ClientList',
    props: true,
    component: () => import('@/views/ClientList.vue'),
    meta: {
      layout: AppBarLayout,
      appBar: {
        action: {
          title: 'Add Client',
          icon: IconEdit,
          route: {
            name: 'ClientItemAdd',
            params: { step: 'basic-info' }
          }
        },
        title: 'Clients',
        backRoute: { name: 'TenantHome' }
      }
    }
  },
  {
    path: '/tenant/:tenantSlug/upload',
    name: 'ClientUpload',
    props: true,
    component: () => import('@/views/ClientUpload.vue'),
    meta: {
      layout: AppBarLayout,
      appBar: { title: 'Portfolio Upload', backRoute: { name: 'TenantHome' } }
    }
  },
  {
    path: '/tenant/:tenantSlug/clients/add',
    name: 'ClientItemAdd',
    props: true,
    component: () => import('@/views/ClientItemAdd.vue'),
    meta: {
      layout: AppBarLayout,
      appBar: { title: 'Add Client', backRoute: { name: 'ClientList' } }
    }
  },
  {
    path: '/tenant/:tenantSlug/clients/:clientId',
    name: 'Client',
    props: true,
    component: () => import('@/views/Client.vue'),
    redirect: { name: 'ClientInfo' },
    meta: {
      appBar: {
        backRoute: { name: 'ClientList' },
        title: 'Client Profile'
      }
    },
    children: [
      {
        path: 'info',
        name: 'ClientInfo',
        props: true,
        component: () => import('@/views/ClientInfo.vue'),
        meta: {
          layout: AppBarLayout,
          pageBackground: 'bg-background',
          headerBackground: 'bg-background',
          appBar: { title: 'Client Profile', backRoute: { name: 'ClientList' } }
        }
      },

      // PMU
      {
        path: 'pmu-sign/select-template',
        name: 'PmuSignTemplateSelector',
        component: () => import('@/views/PmuSignTemplateSelector.vue'),
        props: true,
        meta: {
          layout: AppBarLayout,
          appBar: { title: 'Form Templates', backRoute: { name: 'ClientInfo' } }
        }
      },

      {
        path: 'pmu-sign/:templateId/choose-method',
        name: 'PmuSignPreview',
        component: () => import('@/views/PmuSignPreview.vue'),
        props: true,
        meta: {
          layout: AppBarLayout,
          appBar: { title: 'PMU Form Sign', backRoute: { name: 'ClientInfo' } }
        }
      },
      {
        path: 'pmu-form-download/:templateId',
        name: 'PmuFormDownload',
        component: () => import('@/views/PmuFormDownload.vue'),
        props: true,
        meta: {
          isPublic: true,
          noNavigation: true,
          appBar: { layout: AppBarLayout, title: 'PMU Form Download' }
        }
      },
      // question flow (From Notification)
      {
        path: 'pmu-sign-fn/:templateId/flow',
        name: 'PmuSignFromNotify',
        component: () => import('@/views/PmuSignFlow.vue'),
        props: true,
        meta: {
          isPublic: true,
          appBar: { title: 'PMU Form Sign', backRoute: { name: 'ClientInfo' } }
        }
      },
      // question flow (No SMS)
      {
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
          layout: AppBarLayout,
          appBar: { title: 'Notes', backRoute: { name: 'ClientInfo' } }
        }
      },
      {
        path: 'notes/add',
        name: 'AddClientNote',
        component: () => import('@/components/client/AddEditNote.vue'),
        props: true,
        meta: {
          layout: AppBarLayout,
          appBar: { title: 'Add Note', backRoute: { name: 'ClientNotes' } }
        }
      },
      {
        path: 'notes/:id',
        name: 'EditClientNote',
        component: () => import('@/components/client/AddEditNote.vue'),
        props: true,
        meta: {
          layout: AppBarLayout,
          appBar: { title: 'Edit Note', backRoute: { name: 'ClientNotes' } }
        }
      },

      {
        path: 'edit',
        name: 'ClientItemEdit',
        component: () => import('@/views/ClientItemEdit.vue'),
        props: true,
        meta: {
          layout: AppBarLayout,
          appBar: {
            title: 'Edit Client Info',
            backRoute: { name: 'ClientInfo' }
          }
        }
      }
    ]
  }
];
