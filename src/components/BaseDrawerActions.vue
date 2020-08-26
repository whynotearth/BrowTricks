<template>
  <transition name="slideYbottom">
    <div @click="close" class="fixed inset-0 z-30 cursor-pointer" v-if="isOpen">
      <div
        @click.stop=""
        class="drawer-card fixed inset-x-0 bottom-0 bg-surface text-on-surface z-30 shadow-16dp rounded-t-xl cursor-default"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
import noPageScrollbar from '@/utils/noPageScrollbarMixin.js';

export default {
  name: 'BaseDrawerActions',
  mixins: [noPageScrollbar],
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      console.log('close.......');
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.drawer-card {
  height: 75vh;
  height: calc(75 * var(--vh));
}
</style>
