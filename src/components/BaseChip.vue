<template functional>
  <div class="chip rounded-sm bg-primary bg-opacity-divider inline-flex px-2">
    <div class="py-1 text-primary tg-caption-bold-mobile flex items-center">
      <div class="mr-2" v-if="$slots.icon"><slot name="icon" /></div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseChip'
};
</script>
