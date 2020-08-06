<template>
  <div
    class="cursor-pointer bg-white shadow-1dp py-6 px-4 rounded-lg"
    :class="[margin]"
    @click="$emit('click')"
  >
    <div class="flex">
      <div class="flex w-1/2">
        <slot name="preIcon"></slot>
        <slot
          ><h4
            class="ml-4 text-on-surface text-opacity-high min-w-expansion-panel"
          >
            {{ title }}
          </h4></slot
        >
      </div>
      <div class="flex w-1/2">
        <div class="flex-grow">
          <!-- middle text -->
          <div
            v-if="middleText || $slots.middleText"
            class="text-on-surface text-opacity-medium text-left"
          >
            <slot name="middleText">{{ middleText }}</slot>
          </div>
        </div>
        <!-- end icon -->
        <slot name="afterIcon">
          <ArrowRight class="fill-current ml-12" />
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
      type: [String, Number]
    },
    margin: {
      type: String,
      default: 'mb-4'
    }
  }
};
</script>

<style scoped>
.min-w-expansion-panel {
  min-width: 80px;
}
</style>
