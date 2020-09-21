import { disableBodyClass, enableBodyClass } from '@/helpers.js';

export default {
  mounted() {
    enableBodyClass('no-pull-to-refresh');
  },
  beforeDestroy() {
    disableBodyClass('no-pull-to-refresh');
  }
};
