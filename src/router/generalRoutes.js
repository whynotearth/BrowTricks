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
  }
];
