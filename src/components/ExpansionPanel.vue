<template>
  <div
    class="cursor-pointer m-4 bg-white shadow-1dp py-6 px-4 rounded-lg"
    @click="$emit('click')"
  >
    <div class="flex justify-between">
      <div class="flex">
        <slot name="preIcon"></slot>
        <slot
          ><h4 class="ml-4 text-on-surface text-opacity-high">
            {{ title }}
          </h4></slot
        >
      </div>
      <div
        v-if="middleText || $slots.middleText"
        class="text-on-surface text-opacity-medium"
      >
        <slot name="middleText">{{ middleText }}</slot>
      </div>
      <div>
        <slot name="after-icon">
          <ArrowRight class="fill-current" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowRight from '@/assets/icons/keyboard_arrow_right.svg';

export default {
  name: 'ExpansionPanel',
  components: {
    ArrowRight
  },
  props: {
    title: {
      type: String
    },
    middleText: {
      type: String
    }
  }
};
</script>

<style></style>
