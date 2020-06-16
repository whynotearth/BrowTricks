<template>
  <component
    :is="tag"
    class="w-full rounded-full tg-color-label-mobile px-4 py-2 flex items-center justify-center"
    @click="$emit('clicked')"
    :href="href"
    :to="to"
  >
    <slot name="icon" />
    <div class="flex-grow">
      <slot name="cta-text">
        Button
      </slot>
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
      type: String
    }
  },
  computed: {
    tag() {
      if (this.href) {
        return 'a';
      } else if (this.to) {
        return 'router-link';
      } else {
        return 'div';
      }
    }
  }
};
</script>

<style />
