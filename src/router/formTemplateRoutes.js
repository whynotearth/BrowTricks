import AppBarCardLayout from '@/layouts/AppBarCardLayout.vue';

export const formTemplateRoutes = [
  {
    path: '/tenant/:tenantSlug/form-templates',
    name: 'FormTemplates',
    component: () => import('@/views/FormTemplates.vue'),
    props: true,
    redirect: { name: 'FormTemplatesList' },
    meta: {
      layout: AppBarCardLayout,
      appBar: {
        title: 'Form Templates'
      }
    },

    children: [
      {
        path: 'requirement',
        name: 'FormTemplatesListEmpty',
        component: () => import('@/views/FormTemplatesListEmpty.vue'),
        props: true,
        meta: {
          layout: AppBarCardLayout,
          appBar: {
            title: `Welcome to ${process.env.VUE_APP_SHORTNAME}`,
            backRoute: { name: 'FormTemplates' }
          }
        }
      },

      {
        path: 'list',
        name: 'FormTemplatesList',
        component: () => import('@/views/FormTemplatesList.vue'),
        props: true,
        meta: {
          layout: AppBarCardLayout,
          appBar: {
            title: 'Form Templates'
          }
        }
      },

      {
        path: 'item/:formId',
        name: 'FormTemplateItem',
        props: true,
        component: () => import('@/views/FormTemplateItem.vue'),
        redirect: { name: 'FormTemplateItemEdit' },
        meta: {
          layout: AppBarCardLayout,
          appBar: {
            title: 'Form Templates'
          }
        },

        children: [
          {
            // edit a single template and sort fields
            path: 'edit',
            name: 'FormTemplateItemEdit',
            component: () => import('@/views/FormTemplateItemEdit.vue'),
            props: true,
            meta: {
              layout: AppBarCardLayout,
              appBar: {
                title: 'Form Setup',
                backRoute: { name: 'FormTemplates' }
              }
            }
          },

          {
            // edit a single template and sort fields
            path: 'edit-meta',
            name: 'FormTemplateItemEditMeta',
            component: () => import('@/views/FormTemplateItemEditMeta.vue'),
            props: true,
            meta: {
              layout: AppBarCardLayout,
              appBar: {
                title: 'Form Setup',
                backRoute: { name: 'FormTemplateItemEdit' }
              }
            }
          },

          {
            path: 'select-new-field',
            name: 'FormTemplateFieldSelection',
            component: () => import('@/views/FormTemplateFieldSelection.vue'),
            props: true,
            meta: {
              layout: AppBarCardLayout,
              appBar: {
                title: 'Form Setup',
                backRoute: { name: 'FormTemplateItemEdit' }
              }
            }
          },
          {
            path: 'field/:fieldId',
            name: 'FormTemplateFieldEdit',
            component: () => import('@/views/FormTemplateFieldEdit.vue'),
            props: true,
            meta: {
              layout: AppBarCardLayout,
              appBar: {
                title: 'Form Setup',
                backRoute: { name: 'FormTemplateItemEdit' }
              }
            }
          }
        ]
      }
    ]
  }
];
