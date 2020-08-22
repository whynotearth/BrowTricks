/* eslint-disable */
export default function configureModerator(store, router) {
  // listen to mutations
  // store.subscribe(({ type, payload }, state) => {
  // });
  // listen to actions
  store.subscribeAction(({ type, payload }, state) => {
    switch (type) {
      case 'auth/logout':
        console.log('got logout');
        router.push({ name: 'Login' });
    }
  });
}
/* eslint-enable */
