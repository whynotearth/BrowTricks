<template>
  <component
    :is="type"
    :href="href"
    class="block cursor-pointer bg-surface shadow-brand1 py-3 px-4 rounded-full"
    :class="[margin]"
    @click="$emit('click')"
    v-bind="attrs"
  >
    <div class="flex">
      <div class="flex items-center" :class="leftSideClasses">
        <div
          v-if="$slots.preIcon"
          class="icon-pre text-on-surface text-opacity-medium flex items-center mr-4"
        >
          <slot name="preIcon"></slot>
        </div>
        <slot
          ><h4
            :title="title"
            class="title mr-4 text-on-surface text-opacity-high min-w-expansion-panel text-left tg-body-bold-mobile"
          >
            {{ title }}
          </h4></slot
        >
      </div>
      <div class="flex flex-grow justify-end">
        <div
          class="subtitle flex-grow flex items-center"
          v-if="middleText || $slots.middleText"
        >
          <!-- middle text -->
          <div
            class="text-on-surface text-opacity-medium text-left capitalize tg-caption-mobile"
          >
            <slot name="middleText">{{ middleText }}</slot>
          </div>
        </div>
        <!-- end icon -->
        <slot name="afterIcon">
          <IconArrowRight
            class="icon-after fill-current ml-4 text-brand1 text-opacity-medium"
          />
        </slot>
      </div>
    </div>
  </component>
</template>

<script>
import IconArrowRight from '@/assets/icons/arrow-right.svg';

export default {
  name: 'ExpansionPanel',
  components: {
    IconArrowRight
  },
  props: {
    attrs: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String
    },
    href: {
      type: String
    },
    middleText: {
      type: [String, Number]
    },
    margin: {
      type: String,
      default: 'mb-4'
    },
    leftSideClasses: {
      type: String,
      default: ''
    }
  },
  computed: {
    type() {
      if (this.href) {
        return 'a';
      }
      return 'div';
    }
  }
};
</script>

<style scoped>
.min-w-expansion-panel {
  min-width: 80px;
}
.subtitle {
  max-width: 162px;
}
[disabled] .title,
[disabled] .icon-pre,
[disabled] .icon-after {
  @apply text-opacity-disabled;
}
</style>
