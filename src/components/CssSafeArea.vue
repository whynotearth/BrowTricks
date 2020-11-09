<template>
  <div>
    <div class="safe-area-top" :class="{ isMobile, hasHeader }"></div>

    <div class="debug"></div>
    <div class="debug2"></div>
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
      return !this.$route.meta.appBar.noHeader;
    }
  }
};
</script>

<style scoped>
.isMobile.safe-area-top {
  height: env(safe-area-inset-top, 40px);
}
.hasHeader.safe-area-top {
  @apply bg-black;
}
.debug {
  display: block;
  width: 50px;
  height: 100px;
  background: red;
}
.debug2 {
  display: block;
  width: 50px;
  height: env(safe-area-inset-top, 40px);
  background: blue;
}
</style>
