<template>
  <div
    class="z-50 fixed inset-0 bg-opacity-medium text-left bg-black flex flex-col"
    @click="$emit('close')"
  >
    <div class="flex justify-end w-full flex-shrink-0">
      <button class="p-3" @click.prevent="$emit('close')" title="Close">
        <IconClose class="text-white" />
      </button>
    </div>

    <div class="w-screen flex justify-center items-center flex-grow">
      <div
        @click.stop
        class="rounded-lg w-full sm:w-128 mx-4"
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
      default: 'bg-primary'
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
