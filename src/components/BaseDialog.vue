<template>
  <div
    class="fixed inset-0 z-50 flex flex-col text-left bg-black bg-opacity-medium"
    @click="$emit('close')"
  >
    <div class="flex justify-end flex-shrink-0 w-full">
      <button class="p-3" @click.prevent="$emit('close')" title="Close">
        <IconClose class="text-white" />
      </button>
    </div>

    <div class="flex items-center justify-center flex-grow w-screen">
      <div
        @click.stop
        class="w-full mx-4 rounded-lg sm:w-128"
        :class="[background, padding]"
      >
        <h6
          v-if="title"
          class="tg-h3-mobile text-opacity-high"
          :class="[textColor]"
        >
          {{ title }}
        </h6>
        <div
          class="mt-4 tg-body-mobile text-opacity-medium"
          :class="[textColor]"
          v-if="$slots.content"
        >
          <slot name="content" />
        </div>
        <div class="flex justify-end" :class="[title ? 'mt-8' : '']">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import noPageScrollbar from '@/utils/noPageScrollbarMixin.js';
import IconClose from '@/assets/icons/close.svg';

export default {
  name: 'BaseDialog',
  mixins: [noPageScrollbar],
  components: { IconClose },
  props: {
    title: {
      type: String
    },
    background: {
      default: 'bg-secondary'
    },
    textColor: {
      default: 'text-on-primary'
    },
    padding: {
      default: 'p-8'
    }
  }
};
</script>

<style scoped></style>
