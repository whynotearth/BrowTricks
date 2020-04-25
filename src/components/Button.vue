<template>
  <div
    class="full-width rounded tg-color-label-mobile py-2 px-3 flex items-center justify-center"
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
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
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
  }
};
</script>

<style />
