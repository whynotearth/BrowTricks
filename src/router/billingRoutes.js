import AppBarLayout from '@/layouts/AppBarCardLayout.vue';

export const billingRoutes = [
  // billing
  {
    path: '/tenant/:tenantSlug/account/billing',
    name: 'AccountBilling',
    props: true,
    component: () => import('@/views/AccountBilling.vue'),
    meta: {
      layout: AppBarLayout,
      appBar: {
        title: 'Billing',
        backRoute: { name: 'AccountSettings' }
      }
    }
  },

  // billing activity
  {
    path: '/tenant/:tenantSlug/account/billing/activity',
    name: 'AccountBillingActivity',
    props: true,
    component: () => import('@/views/AccountBillingActivity.vue'),
    meta: {
      layout: AppBarLayout,
      appBar: {
        title: 'Activity',
        backRoute: { name: 'AccountBilling' }
      }
    }
  },

  // billing payment methods
  {
    path: '/tenant/:tenantSlug/account/billing/payment-methods',
    name: 'AccountBillingPaymentMethods',
    props: true,
    component: () => import('@/views/AccountBillingPaymentMethods.vue'),
    meta: {
      layout: AppBarLayout,
      appBar: {
        title: 'Payment Methods',
        backRoute: { name: 'AccountBilling' }
      }
    }
  },

  {
    path: '/tenant/:tenantSlug/account/billing/payment-methods/add',
    name: 'AccountBillingPaymentMethodsAdd',
    props: true,
    component: () => import('@/views/AccountBillingPaymentMethodsAddEdit.vue'),
    meta: {
      layout: AppBarLayout,
      appBar: {
        title: 'Payment Methods',
        backRoute: { name: 'AccountBillingPaymentMethods' }
      }
    }
  },

  {
    path: '/tenant/:tenantSlug/account/billing/payment-methods/:id',
    name: 'AccountBillingPaymentMethodsEdit',
    props: true,
    component: () => import('@/views/AccountBillingPaymentMethodsAddEdit.vue'),
    meta: {
      layout: AppBarLayout,
      appBar: {
        title: 'Payment Methods',
        backRoute: { name: 'AccountBillingPaymentMethods' }
      }
    }
  },

  // billing subscription
  {
    path: '/tenant/:tenantSlug/account/billing/subscriptions',
    name: 'AccountBillingSubscriptions',
    props: true,
    component: () => import('@/views/AccountBillingSubscriptions.vue'),
    meta: {
      layout: AppBarLayout,
      title: 'Subscriptions Management',
      appBar: {
        title: 'Subscriptions',
        backRoute: { name: 'AccountBilling' }
      }
    }
  }
];
