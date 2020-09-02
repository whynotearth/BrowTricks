<template>
  <div class="flex flex-row w-full justify-between p-4 cursor-pointer">
    <p class="text-on-background">{{ rowKey }}</p>
    <div class="flex flex-row">
      <p class="text-gray-600 pr-4">{{ rowValue }}</p>
      <IconArrowForward
        class="fill-current text-on-background text-opacity-medium"
      />
    </div>
  </div>
</template>

<script>
import IconArrowForward from '@/assets/icons/chevron-right.svg';

export default {
  name: 'AccountEditRow',
  components: { IconArrowForward },
  props: ['rowKey', 'rowValue']
};
</script>
