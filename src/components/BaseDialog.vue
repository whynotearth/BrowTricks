<template>
  <div
    class="z-50 fixed inset-0 bg-on-background bg-opacity-medium text-left"
    @click="$emit('close')"
  >
    <div class="h-full w-screen flex justify-center items-center">
      <div @click.stop class="rounded-lg w-full p-8 sm:w-128 bg-primary mx-4">
        <h6 v-if="title" class="tg-h3-mobile text-on-primary text-opacity-high">
          {{ title }}
        </h6>
        <div
          class="mt-4 tg-body-mobile text-on-primary text-opacity-medium"
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
import { disableScrollbars, enableScrollbars } from '@/helpers.js';

export default {
  name: 'BaseDialog',
  props: {
    title: {
      type: String
    }
  },
  mounted() {
    disableScrollbars();
  },
  beforeDestroy() {
    enableScrollbars();
  }
};
</script>

<style scoped></style>
