<template>
  <div
    class="full-width text rounded-sm bg-secondary tg-color-label-mobile p-2 flex items-center justify-center"
  >
    <div class="flex-1 text-left text-white">
      <component :is="icon" class="h-6 w-6 fill-current opacity-1" />
    </div>
    <div class="flex-grow">
      {{ ctaText }}
    </div>
    <div class="flex-1" />
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
    }
  }
};
</script>

<style />
