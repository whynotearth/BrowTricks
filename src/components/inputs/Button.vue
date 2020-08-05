<template>
  <component
    :is="type"
    class="button tg-color-label-mobile font-semibold uppercase cursor-pointer transition-all duration-75"
    :class="[
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
    <div class="flex items-center justify-center">
      {{ title }}
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
      default: 'bg-newsecondary'
    },
    textColor: {
      type: String,
      default: 'text-newprimary'
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
