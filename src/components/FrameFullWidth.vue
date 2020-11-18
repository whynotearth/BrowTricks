<template functional>
  <div class="bg-pattern p-10">
    <div class="bg-background p-4">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FrameFullWidth'
};
</script>

<style scoped>
.bg-pattern {
  background-image: url('https://res.cloudinary.com/whynotearth/image/upload/v1601297195/BrowTricks/static_v2/rosegold-pattern2_hstttj.jpg');
}
</style>
