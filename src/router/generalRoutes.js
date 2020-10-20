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
    path: '/forgot',
    name: 'AuthForgotPassword',
    component: () => import('@/views/AuthForgotPassword.vue'),
    props: true,
    meta: {
      isPublic: true,
      noNavigation: true,
      layout: AppBarCardLayout,
      appBar: {
        backRoute: { name: 'AuthLogin' },
        title: 'Forgot Password?'
      }
    }
  },
  {
    path: '/email-sent-success',
    name: 'AuthSentEmailSuccess',
    component: () => import('@/views/AuthSentEmailSuccess.vue'),
    props: true,
    meta: {
      isPublic: true,
      noNavigation: true,
      layout: AppBarCardLayout,
      appBar: {
        backRoute: { name: 'AuthLogin' },
        title: 'Check Your Email'
      }
    }
  },
  {
    path: '/reset',
    name: 'AuthResetPassword',
    component: () => import('@/views/AuthResetPassword.vue'),
    props: true,
    meta: {
      isPublic: true,
      noNavigation: true,
      layout: AppBarCardLayout,
      appBar: {
        backRoute: { name: 'AuthLogin' },
        title: 'Create New Password'
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
    name: 'AuthSignupEdit',
    component: () => import('@/views/AuthSignupEdit.vue'),
    props: true,
    meta: {
      noNavigation: true,
      layout: AppBarCardLayout,
      appBar: {
        backRoute: { name: 'PanelRedirector' },
        title: 'Edit Account'
      }
    }
  },
  {
    path: '/verify-number',
    name: 'AuthNumberVerify',
    component: () => import('@/views/AuthNumberVerify.vue'),
    props: true,
    meta: {
      pageBackground: 'bg-background',
      noNavigation: true,
      layout: AppBarCardLayout,
      appBar: {
        backRoute: { name: 'AuthSignupEdit' },
        title: 'Verification Required'
      }
    }
  },
  {
    path: '/verify-email',
    name: 'AuthEmailVerify',
    component: () => import('@/views/AuthEmailVerify.vue'),
    props: true,
    meta: {
      pageBackground: 'bg-background',
      noNavigation: true,
      layout: AppBarCardLayout,
      appBar: {
        backRoute: { name: 'AuthSignupEdit' },
        title: 'Verification Required'
      }
    }
  },
  {
    path: '/verify-submit-email',
    name: 'AuthEmailSubmitVerify',
    component: () => import('@/views/AuthEmailSubmitVerify.vue'),
    props: true,
    meta: {
      isPublic: true,
      pageBackground: 'bg-background',
      noNavigation: true,
      layout: AppBarCardLayout,
      appBar: {
        backRoute: { name: 'Home' },
        title: 'Verifying Email'
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
