import AppBarCardLayout from '@/layouts/AppBarCardLayout.vue';

export const generalRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      isPublic: true,
      noNavigation: true
    }
  },
  {
    path: '/logout',
    name: 'AuthLogout',
    component: () => import('@/views/AuthLogout.vue'),
    meta: {
      isPublic: true,
      noNavigation: true,
      layout: AppBarCardLayout,
      appBar: {
        backRoute: { name: 'Home' },
        title: 'Logging out...'
      }
    }
  },
  {
    path: '/login',
    name: 'AuthLogin',
    component: () => import('@/views/AuthLogin.vue'),
    props: true,
    meta: {
      isPublic: true,
      noNavigation: true,
      layout: AppBarCardLayout,
      appBar: {
        backRoute: { name: 'Home' },
        title: 'Welcome Back!'
      }
    }
  },
  {
    path: '/signup',
    name: 'AuthSignup',
    component: () => import('@/views/AuthSignup.vue'),
    props: true,
    meta: {
      isPublic: true,
      noNavigation: true,
      layout: AppBarCardLayout,
      appBar: {
        backRoute: { name: 'Home' },
        title: 'Create Account'
      }
    }
  },
  {
    path: '/signup/edit',
    name: 'AughSignupEdit',
    component: () => import('@/views/AughSignupEdit.vue'),
    props: true,
    meta: {
      isPublic: true,
      noNavigation: true,
      layout: AppBarCardLayout,
      appBar: {
        backRoute: { name: 'AuthNumberVerify' },
        title: 'Edit Account'
      }
    }
  },
  {
    path: '/verify',
    name: 'AuthNumberVerify',
    component: () => import('@/views/AuthNumberVerify.vue'),
    props: true,
    meta: {
      pageBackground: 'bg-background',
      noNavigation: true,
      layout: AppBarCardLayout,
      appBar: {
        backRoute: { name: 'AughSignupEdit' },
        title: 'Verification Required'
      }
    }
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('@/views/PrivacyPolicy.vue'),
    meta: {
      isPublic: true,
      appBar: {
        title: 'Privacy Policy'
      }
    }
  }
];
