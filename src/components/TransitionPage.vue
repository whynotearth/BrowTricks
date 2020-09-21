<template>
  <div>
    <transition name="fadeslow" mode="out-in">
      <div class="transition-page-wrapper" v-show="!loadingGet && isVisible">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TransitionPage',
  data: () => ({
    isVisible: false
  }),
  mounted() {
    this.isVisible = true;
  },
  computed: {
    ...mapGetters('loading', ['loadingGet'])
  }
};
</script>
