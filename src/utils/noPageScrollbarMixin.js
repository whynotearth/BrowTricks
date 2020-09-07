// We can't use helpers here because of a bug in vue-cli (?) which delays importing this mixin and components got an undefined mixin
// import { disableBodyClass, enableBodyClass } from '@/helpers.js';

export default {
  mounted() {
    document.body.classList.add('no-scrollbars');
  },
  beforeDestroy() {
    document.body.classList.remove('no-scrollbars');
  }
};
