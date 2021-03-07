import AppBarCardLayout from '@/layouts/AppBarCardLayout.vue';

export const generalRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      isPublic: true,
      noNavigation: true,
      appBar: { noHeader: true },
      pageBackground: 'bg-background'
    }
  },
  {
    path: '/wait',
    name: 'PanelRedirector',
    props: true,
    component: () => import('@/views/PanelRedirector.vue'),
    meta: {
      isPublic: true,
      pageBackground: 'bg-background',
      layout: AppBarCardLayout,
      noNavigation: true,
      appBar: {
        title: 'Please wait...'
      }
    }
  },

  {
    path: '/pricing',
    name: 'Pricing',
    component: () => import('@/views/Pricing.vue'),
    meta: {
      layout: AppBarCardLayout,
      isPublic: true,
      pageBackground: 'bg-background',
      noNavigation: true,
      appBar: {
        backRoute: { name: 'Home' },
        title: 'Pricing'
      }
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('@/views/Help.vue'),
    meta: {
      isPublic: true,
      pageBackground: 'bg-background',
      noNavigation: true,
      title: 'Help'
    }
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('@/views/PrivacyPolicy.vue'),
    meta: {
      isPublic: true,
      pageBackground: 'bg-background',
      noNavigation: true,
      appBar: {
        backRoute: { name: 'Home' },
        title: 'Privacy Policy'
      }
    }
  }
];
