<template functional>
  <div
    :class="[props.background || 'bg-brand2']"
    class="chip rounded-sm inline-flex px-2 bg-opacity-high select-none"
  >
    <div class="py-1 text-on-surface tg-caption-bold-mobile flex items-center">
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
