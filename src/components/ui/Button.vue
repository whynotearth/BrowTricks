<template>
  <component
    :is="tag"
    class="full-width rounded tg-color-label-mobile p-2 flex items-center justify-center"
    @click="$emit('clicked')"
    :href="href"
    :to="to"
  >
    <div class="text-left h-6 w-6">
      <slot name="icon" />
    </div>
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
