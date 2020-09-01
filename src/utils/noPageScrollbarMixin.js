import { disableScrollbar, enableScrollbar } from '@/helpers.js';

export default {
  mounted() {
    disableScrollbar();
  },
  beforeDestroy() {
    enableScrollbar();
  }
};
