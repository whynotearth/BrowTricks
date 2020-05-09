<template functional>
  <div class="h-screen flex flex-col">
    <slot name="header" />
    <div class="flex-1 overflow-auto flex flex-col disable-scrollbars">
      <slot name="content" />
    </div>
    <slot name="footer" />
  </div>
</template>

<script>
export default {
  name: 'LayoutFixedScrollable'
};
</script>
