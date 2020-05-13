<template>
  <vue100vh class="flex flex-col">
    <slot name="header" />
    <div class="flex-grow overflow-auto flex flex-col disable-scrollbars">
      <slot name="content" />
    </div>
    <slot name="footer" />
  </vue100vh>
</template>

<script>
import vue100vh from 'vue-100vh';

export default {
  name: 'LayoutFixedScrollable',
  components: { vue100vh }
};
</script>
