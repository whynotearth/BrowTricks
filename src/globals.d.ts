// Typically this is loaded automatically when you import VueRouter via TS, but we're not doing that for now.
import VueRouter, { Route } from 'vue-router';

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
  }
}
