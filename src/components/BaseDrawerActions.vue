<template>
  <transition name="slideYbottom">
    <div
      @click.stop="close"
      class="fixed inset-0 z-100 cursor-pointer"
      v-if="isOpen"
    >
      <section
        @click.stop=""
        class="drawer-card fixed inset-x-0 bottom-0 bg-surface text-on-surface z-30 shadow-16dp rounded-t-xl cursor-default flex flex-col"
      >
        <header class="flex justify-center relative pt-4 pb-6">
          <h2 class="tg-caption-bold-mobile text-on-surface text-opacity-high">
            {{ title }}
          </h2>
          <a
            class="cursor-pointer"
            tabindex="0"
            @click="close"
            aria-label="Close"
          >
            <IconClose
              class="iconClose absolute top-0 right-0 fill-current text-on-background text-opacity-medium w-6 h-6"
            />
          </a>
        </header>
        <DrawerContent
          class="flex-grow flex h-full pt-2 narrow-scrollbar has-light-bg overflow-y-auto"
          :class="className"
        >
          <div class="w-full">
            <slot />
          </div>
        </DrawerContent>
      </section>
    </div>
  </transition>
</template>

<script>
import noPageScrollbar from '@/utils/noPageScrollbarMixin';
import IconClose from '@/assets/icons/close.svg';

const DrawerContent = {
  mixins: [noPageScrollbar],
  name: 'DrawerContent',
  render: function(createElement) {
    return createElement('div', this.$slots.default);
  }
};

export default {
  name: 'BaseDrawerActions',
  components: { DrawerContent, IconClose },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  methods: {
    close() {
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
.iconClose {
  margin-top: 12px;
  margin-right: 16px;
}
</style>
