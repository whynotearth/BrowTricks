<template>
  <div class="flex items-center w-full">
    <div class="h-10 w-10 mr-2">
      <slot name="image">
        <img :src="IconLineItemDefault" class="h-10 w-10" />
      </slot>
    </div>
    <div class="text-left">
      <div class="tg-h3-mobile"><slot name="title" /></div>
      <div class="tg-body-mobile"><slot name="subtitle" /></div>
      <div class="tg-body-mobile"><slot name="description" /></div>
    </div>
    <div class="ml-auto tg-caption-mobile">
      <a @click.prevent="$emit('detailClicked')">
        <slot name="detail" />
      </a>
    </div>
  </div>
</template>

<script>
import IconLineItemDefault from '@/assets/icons/line_item_default.png';

export default {
  name: 'BaseLineItem',
  data() {
    return {
      IconLineItemDefault
    };
  }
};
</script>
