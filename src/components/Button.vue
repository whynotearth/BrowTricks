<template>
  <component
    :is="tag"
    class="full-width rounded tg-color-label-mobile py-2 px-3 flex items-center justify-center"
    @click="$emit('clicked')"
    :href="href"
    :to="to"
  >
    <div class="text-left">
      <component
        v-if="icon"
        :is="icon"
        class="h-6 w-6 fill-current"
        :class="iconStyle"
      />
    </div>
    <div class="flex-grow">
      {{ ctaText }}
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
    },
    ctaText: {
      type: String,
      required: true
    },
    icon: {
      type: Object
    },
    iconStyle: {
      type: Array
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
