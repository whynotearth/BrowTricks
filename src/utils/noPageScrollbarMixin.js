import { disableBodyClass, enableBodyClass } from '@/helpers.js';

export default {
  mounted() {
    enableBodyClass('no-scrollbars');
  },
  beforeDestroy() {
    disableBodyClass('no-scrollbars');
  }
};
