<template>
  <component
    :is="type"
    class="tg-color-label-mobile font-semibold uppercase cursor-pointer text-white text-sm inline-block"
    :class="[
      isRipple ? 'ripple' : '',
      isRounded ? 'rounded-full' : '',
      width,
      background,
      padding
    ]"
    @click="$emit('clicked')"
    :href="href"
    :to="to"
  >
    <div class="flex flex-row items-center">
      <div class="text-left">
        <slot name="icon"></slot>
      </div>
      <div
        class="text-left"
        :class="[titleLeft || title ? 'flex-1' : 'hidden']"
      >
        {{ titleLeft }}
      </div>
      <div class="flex-grow text-center" v-if="title">
        {{ title }}
      </div>
      <div
        class="text-right"
        :class="[titleRight || title ? 'flex-1' : 'hidden']"
      >
        {{ titleRight }}
      </div>
    </div>
  </component>
</template>

<script>
export default {
  name: 'Button',
  props: {
    href: {
      type: String
    },
    to: {
      type: [String, Object]
    },
    title: {
      type: String,
      default: ''
    },
    titleLeft: {
      type: String,
      default: ''
    },
    titleRight: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: 'w-full'
    },
    background: {
      type: String,
      default: 'bg-button'
    },
    isRipple: {
      type: Boolean,
      default: true
    },
    padding: {
      type: String,
      default: 'px-4 py-2'
    },
    isRounded: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    type() {
      if (this.href) {
        return 'a';
      } else if (this.to) {
        return 'router-link';
      } else {
        return 'button';
      }
    }
  }
};
</script>

<style scoped>
.ripple {
  background-position: center;
  transition: background 0.4s;
}

.ripple:hover,
.ripple:active {
  @apply bg-button bg-opacity-high;
}
</style>
