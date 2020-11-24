<template>
  <div class="wrapper" :style="{ paddingTop: `${ratio * 100}%` }">
    <div class="inner">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RatioBox',
  props: {
    ratio: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style scoped>
.wrapper {
  height: 0;
  overflow: hidden;
  background: white;
  position: relative;
}

.inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
