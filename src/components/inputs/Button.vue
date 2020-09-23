<template>
  <component
    :is="type"
    class="button tg-button font-semibold uppercase cursor-pointer transition-all duration-75 select-none"
    :class="[
      isBordered ? 'border border-black' : '',
      shadow,
      margin,
      display,
      maxWidth,
      isRounded ? 'rounded-full' : '',
      width,
      background,
      textColor,
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
      default: 'bg-primary'
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
      default: 'text-on-primary text-opacity-high'
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
      default: true
    },
    display: {
      type: String,
      default: 'block'
    },
    margin: {
      type: String,
      default: 'mx-auto'
    },
    isBordered: {
      type: Boolean,
      default: false
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
    }
  }
};
</script>

<style scoped>
.button:focus {
  outline: none;
  box-shadow: 0 0 0 2px white;
}
</style>
