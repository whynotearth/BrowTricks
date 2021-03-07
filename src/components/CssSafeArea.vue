<template>
  <div :class="['safe-area-top', { isMobileApp, hasHeader }]" />
</template>

<script>
export default {
  name: 'CssSafeArea',
  computed: {
    hasHeader() {
      return !(this.$route.meta.appBar || {}).noHeader;
    }
  }
};
</script>

<style scoped>
.isMobileApp.safe-area-top {
  height: env(safe-area-inset-top, 0);
}
.hasHeader.safe-area-top {
  @apply bg-black;
}
</style>
