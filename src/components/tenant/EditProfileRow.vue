<template>
  <div class="flex flex-row w-full justify-between p-4 cursor-pointer">
    <p class="text-on-background">{{ rowKey }}</p>
    <div class="flex flex-row">
      <p class="text-gray-600 pr-4">{{ rowValue }}</p>
      <ArrowForward />
    </div>
  </div>
</template>

<script>
import ArrowForward from '@/assets/icons/chevron-right.svg';

export default {
  components: {
    ArrowForward
  },
  name: 'EditProfileRow',
  props: ['rowKey', 'rowValue']
};
</script>
