export const generalRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      isPublic: true
    }
  },
  {
    path: '/logout',
    name: 'AuthLogout',
    component: () => import('@/views/AuthLogout.vue'),
    meta: {
      isPublic: true,
      layout: () => import('@/layouts/AppBarLayout.vue'),
      routeBack: { name: 'Home' },
      appBar: {
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
      layout: () => import('@/layouts/AppBarLayout.vue'),
      routeBack: { name: 'Home' },
      appBar: {
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
      layout: () => import('@/layouts/AppBarLayout.vue'),
      routeBack: { name: 'Home' },
      appBar: {
        title: 'Create Account'
      }
    }
  }
];
