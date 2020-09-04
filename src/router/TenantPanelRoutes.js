export const TenantPanelRoutes = [
  {
    path: '/account',
    name: 'MyAccountEmpty',
    props: true,
    component: () => import('@/views/MyAccountEmpty.vue'),
    meta: {
      isPublic: true,
      layout: () => import('@/layouts/WithSwitcherBarLayout.vue'),
      title: 'My Account'
    }
  },
  {
    path: '/tenant/:tenantSlug/account',
    name: 'MyAccount',
    props: true,
    component: () => import('@/views/MyAccount.vue'),
    meta: {
      layout: () => import('@/layouts/WithSwitcherBarLayout.vue'),
      title: 'My Account'
    }
  },
  {
    // first step: /sign-up/business-info
    path: '/sign-up/:step',
    name: 'SignUp',
    props: true,
    component: () => import('@/views/AuthSignUp.vue'),
    meta: {
      layout: () => import('@/layouts/TenantLayout.vue'),
      needsUserInfo: true
    }
  },
  {
    path: '/tenant/:tenantSlug',
    name: 'TenantHome',
    props: true,
    component: () => import('@/views/TenantHome.vue')
  },
  {
    path: '/tenant/:tenantSlug/home',
    name: 'ShopHome',
    props: true,
    component: () => import('@/views/Home.vue'),
    meta: { isPublic: true }
  },
  {
    path: '/tenant/:tenantSlug/account/edit',
    name: 'AccountInfoEdit',
    props: true,
    component: () => import('@/views/AccountInfoEdit.vue'),
    meta: {
      layout: () => import('@/layouts/WithTitleBarLayout.vue'),
      title: 'Edit Account',
      backRoute: { name: 'MyAccount' }
    }
  },

  {
    path: '/tenant/:tenantSlug/form-templates',
    name: 'FormTemplates',
    component: () => import('@/views/FormTemplates.vue'),
    props: true,
    redirect: { name: 'FormTemplatesList' },
    meta: {
      layout: () => import('@/layouts/WithTitleBarLayout.vue'),
      title: 'Form Templates'
    },
    children: [
      {
        path: 'list',
        name: 'FormTemplatesList',
        component: () => import('@/views/FormTemplatesList.vue'),
        props: true,
        meta: {
          layout: () => import('@/layouts/WithTitleBarLayout.vue'),
          title: 'Form Templates'
        }
      },
      {
        path: 'add',
        name: 'FormTemplatesAdd',
        component: () => import('@/views/FormTemplatesAddEdit.vue'),
        props: true,
        meta: {
          layout: () => import('@/layouts/WithTitleBarLayout.vue'),
          title: 'Form Templates Setup',
          backRoute: { name: 'FormTemplates' }
        }
      },
      {
        path: 'edit/:formId',
        name: 'FormTemplatesEdit',
        component: () => import('@/views/FormTemplatesAddEdit.vue'),
        props: true,
        meta: {
          layout: () => import('@/layouts/WithTitleBarLayout.vue'),
          title: 'Form Templates Setup',
          backRoute: { name: 'FormTemplates' }
        }
      },
      {
        path: 'field-selection',
        name: 'FormTemplateFieldSelection',
        component: () => import('@/views/FormTemplateFieldSelection.vue'),
        props: true,
        meta: {
          layout: () => import('@/layouts/WithTitleBarLayout.vue'),
          title: 'Form Templates Setup'
        }
      }
    ]
  },

  // TODO: remove
  {
    // tenant pmu setup
    path: '/tenant/:tenantSlug/pmu-setup',
    name: 'TenantPmuSetup',
    component: () => import('@/views/TenantPmuSetup.vue'),
    props: true,
    meta: {
      layout: () => import('@/layouts/WithTitleBarLayout.vue'),
      title: 'PMU Form Setup',
      backRoute: { name: 'TenantHome' }
    }
  }
];
