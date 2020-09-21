/* eslint-disable */
export default function configureModerator(store, router) {
  // https://vuex.vuejs.org/api/#subscribeaction
  store.subscribeAction({
    after: (action, state) => {
      switch (action.type) {
        case 'auth/logout':
          router.push({ name: 'Home' });
      }
    }
  });
}
/* eslint-enable */
