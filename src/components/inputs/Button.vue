<template>
  <component
    :is="type"
    class="button tg-color-label-mobile font-semibold uppercase cursor-pointer transition-all duration-75 select-none"
    :class="[
      `theme-${theme}`,
      shadow,
      margin,
      display,
      maxWidth,
      isRounded ? 'rounded-full' : '',
      width,
      background,
      textColorComputed,
      padding
    ]"
    v-bind="attrs"
    v-on="eventListeners"
    :href="href"
    :to="to"
  >
    <div
      class="flex content-between w-full items-center"
      :class="[textJustify]"
    >
      <slot name="start" />
      <div class="flex items-center flex-grow-0">
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
    attrs: {
      type: Object,
      default: () => {}
    },
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
    shadow: {
      type: String,
      default: ''
    },
    textJustify: {
      type: String,
      default: 'justify-center'
    },
    textColor: {
      type: String,
      default: ''
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
      default: 'btnprimary' // ['btnprimary', 'btnsecondary']
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
    textColorComputed() {
      if (this.textColor) {
        return this.textColor;
      }
      return this.theme === 'btnprimary'
        ? 'text-on-secondary text-opacity-high'
        : 'text-primary text-opacity-high';
    }
  }
};
</script>

<style scoped>
.button:focus {
  outline: none;
  box-shadow: 0 0 0 2px white;
}
.theme-btnprimary {
  @apply shadow-2dp;
  background: linear-gradient(
      308deg,
      rgba(237, 187, 174, 0.14) 0%,
      rgba(255, 255, 255, 0.42) 49.37%,
      rgba(255, 255, 255, 0.42) 98.01%
    ),
    #edaeae;
}
.theme-btnsecondary {
  @apply shadow-2dp bg-secondary;
}
</style>
