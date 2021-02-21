<template>
  <component
    :is="type"
    class="flex justify-center tg-color-label-mobile button cursor-pointer transition-all duration-75 select-none hover:shadow-lg"
    :class="[
      isBordered ? 'border border-black' : '',
      shadow,
      margin,
      display,
      maxWidth,
      radius,
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
    <div class="flex content-between items-center" :class="[textJustify]">
      <slot name="start" />
      <span class="title flex items-center flex-grow-0">{{ title }}</span>
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
      default: 'min-w-200'
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
    radius: {
      type: String,
      default: 'rounded-full'
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
.button {
  transition: box-shadow 300ms ease;
}
.button:focus {
  outline: none;
  /* color is brand1 */
  box-shadow: 0 0 0 2px #b5bbc9;
}
.min-w-200 {
  min-width: 200px;
}
.max-w-200 {
  max-width: 200px;
}
.max-w-240 {
  max-width: 240px;
}

.title {
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>
