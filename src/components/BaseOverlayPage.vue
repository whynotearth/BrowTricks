<template>
  <transition name="slideYbottom">
    <div
      @click.stop="close"
      class="fixed inset-0 z-100 cursor-pointer"
      v-if="isOpen"
    >
      <section
        @click.stop=""
        class="h-vh100 fixed inset-x-0 bottom-0 bg-surface text-on-surface z-30 shadow-16dp rounded-t-xl cursor-default flex flex-col"
      >
        <header class="flex items-center pt-4 pb-6 px-4">
          <a
            class="cursor-pointer block mr-4"
            tabindex="0"
            @click="close"
            aria-label="Close"
          >
            <IconClose
              class="iconClose fill-current text-on-background text-opacity-medium w-6 h-6"
            />
          </a>
          <h2 class="tg-h2-mobile text-on-surface text-opacity-medium">
            {{ title }}
          </h2>
        </header>
        <DrawerContent class="flex-grow overflow-y-auto">
          <slot />
        </DrawerContent>
      </section>
    </div>
  </transition>
</template>

<script>
import noPageScrollbarMixin from '@/utils/noPageScrollbarMixin.js';
import IconClose from '@/assets/icons/close.svg';

const DrawerContent = {
  name: 'DrawerContent',
  render: function(createElement) {
    return createElement('div', this.$slots.default);
  },
  mixins: [noPageScrollbarMixin]
};

export default {
  name: 'BaseOverlayPage',
  components: { DrawerContent, IconClose },
  props: {
    title: {
      default: ''
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>
