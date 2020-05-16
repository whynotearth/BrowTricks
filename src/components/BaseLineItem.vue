<template>
  <div class="flex items-center w-full">
    <div class="h-10 w-10 mr-2">
      <slot name="image">
        <img :src="LineItemImageDefault" class="h-10 w-10" />
      </slot>
    </div>
    <div class="text-left">
      <slot name="title" />
      <slot name="subtitle" />
      <slot name="description" />
    </div>
    <div class="ml-auto" @click="$emit('detailClicked')">
      <slot name="detail" />
    </div>
  </div>
</template>

<script>
import IconLineItemDefault from '@/assets/icons/line_item_default.png';

export default {
  name: 'LineItem',
  data() {
    return {
      LineItemImageDefault
    };
  }
};
</script>
