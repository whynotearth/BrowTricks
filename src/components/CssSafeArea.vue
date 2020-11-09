<template>
  <div>
    <div class="safe-area-top" :class="{ isMobile, hasHeader }"></div>
  </div>
</template>

<script>
export default {
  name: 'CssSafeArea',
  computed: {
    isMobile() {
      return process.env.VUE_APP_MOBILE === 'true';
    },
    hasHeader() {
      return !(this.$route.meta.appBar || {}).noHeader;
    }
  }
};
</script>

<style scoped>
.isMobile.safe-area-top {
  height: env(safe-area-inset-top, 0);
}
.hasHeader.safe-area-top {
  @apply bg-black;
}
</style>
