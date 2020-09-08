export const formTemplateRoutes = [
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
        path: 'item/:formId',
        name: 'FormTemplateItem',
        props: true,
        component: () => import('@/views/FormTemplateItem.vue'),
        redirect: { name: 'FormTemplateItemEdit' },
        meta: {
          layout: () => import('@/layouts/WithTitleBarLayout.vue'),
          title: 'Form Templates'
        },

        children: [
          {
            // edit form meta info
            path: 'edit',
            name: 'FormTemplateItemEdit',
            component: () => import('@/views/FormTemplateItemEdit.vue'),
            props: true,
            meta: {
              layout: () => import('@/layouts/WithTitleBarLayout.vue'),
              title: 'Form Templates Setup',
              backRoute: { name: 'FormTemplates' }
            }
          },

          {
            path: 'select-new-field',
            name: 'FormTemplateFieldSelection',
            component: () => import('@/views/FormTemplateFieldSelection.vue'),
            props: true,
            meta: {
              layout: () => import('@/layouts/WithTitleBarLayout.vue'),
              title: 'Form Templates Setup',
              backRoute: { name: 'FormTemplateItemEdit' }
            }
          },
          {
            path: 'edit-field/:fieldId',
            name: 'FormTemplateFieldEdit',
            component: () => import('@/views/FormTemplateFieldEdit.vue'),
            props: true,
            meta: {
              layout: () => import('@/layouts/WithTitleBarLayout.vue'),
              title: 'Form Templates Setup',
              backRoute: { name: 'FormTemplateItemEdit' }
            }
          }
        ]
      }
    ]
  }
];
