// NOTE: We can't use helpers here because of a bug in vue-cli (?) which delays importing this mixin and components got an undefined mixin
// import { disableBodyClass, enableBodyClass } from '@/helpers.js';

import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters('global', ['noScrollbarCountGet'])
  },
  methods: {
    ...mapMutations('global', [
      'noScrollbarCountIncrease',
      'noScrollbarCountDecrease'
    ])
  },
  mounted() {
    this.noScrollbarCountIncrease();
    document.body.classList.add('no-scrollbars');
  },
  beforeDestroy() {
    this.noScrollbarCountDecrease();
    if (this.noScrollbarCountGet < 1) {
      document.body.classList.remove('no-scrollbars');
    }
  }
};
