export const authRoutes = [
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('@/views/AuthWelcome.vue'),
    meta: {
      layout: () => import('@/layouts/TenantLayout.vue'),
      isPublic: true,
      needsUserInfo: true
    }
  },
  // TODO: add a redirect for /sign-up and /register
  {
    // first step: /sign-up/business-info
    path: '/sign-up/:step',
    name: 'SignUp',
    props: true,
    component: () => import('@/views/AuthSignUp.vue'),
    meta: {
      layout: () => import('@/layouts/TenantLayout.vue'),
      isPublic: true,
      needsUserInfo: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/AuthLogIn.vue'),
    meta: { layout: () => import('@/layouts/TenantLayout.vue'), isPublic: true }
  },
  {
    path: '/sign-up/success/:slug',
    name: 'SignUpSuccess',
    component: () => import('@/components/auth/SignUpSuccess.vue'),
    meta: { layout: () => import('@/layouts/TenantLayout.vue'), isPublic: true }
  }
];
