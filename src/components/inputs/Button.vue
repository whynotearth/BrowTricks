<template>
  <component
    :is="type"
    class="button tg-color-label-mobile font-semibold uppercase cursor-pointer transition-all duration-75 text-opacity-high"
    :class="[
      `theme-${theme}`,
      margin,
      display,
      maxWidth,
      isRounded ? 'rounded-full' : '',
      width,
      background,
      textColor,
      padding
    ]"
    v-on="eventListeners"
    :href="href"
    :to="to"
  >
    <div
      class="flex content-between w-full items-center"
      :class="[textJustify]"
    >
      <slot name="start" />
      <div class="flex items-center flex-grow-0 mx-auto">
        {{ title }}
      </div>
      <slot name="end" />
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
    width: {
      type: String,
      default: 'w-full'
    },
    background: {
      type: String,
      default: ''
    },
    textJustify: {
      type: String,
      default: 'justify-center'
    },
    maxWidth: {
      type: String,
      default: 'max-w-md'
    },
    padding: {
      type: String,
      default: 'px-4 py-2'
    },
    isRounded: {
      type: Boolean,
      default: false
    },
    display: {
      type: String,
      default: 'block'
    },
    margin: {
      type: String,
      default: 'mx-auto'
    },
    theme: {
      type: String,
      default: 'softgradient'
    }
  },
  computed: {
    eventListeners: function() {
      return Object.assign({}, this.$listeners, {
        click: () => {
          this.$emit('clicked');
        }
      });
    },
    type() {
      if (this.href) {
        return 'a';
      } else if (this.to) {
        return 'router-link';
      } else {
        return 'button';
      }
    },
    textColor() {
      return this.theme === 'softgradient'
        ? 'text-on-secondary'
        : 'text-primary';
    }
  }
};
</script>

<style scoped>
.button:focus {
  outline: none;
  box-shadow: 0 0 0 2px white;
}
.theme-softgradient {
  @apply shadow-2dp;
  background: linear-gradient(
      308deg,
      rgba(237, 187, 174, 0.14) 0%,
      rgba(255, 255, 255, 0.42) 49.37%,
      rgba(255, 255, 255, 0.42) 98.01%
    ),
    #edaeae;
}
</style>
