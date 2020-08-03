export const generalRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      isPublic: true
    }
  }
];
