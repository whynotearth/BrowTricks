<template functional>
  <div class="bg-pattern px-2 md:px-10 py-6 md:py-10">
    <div class="bg-background p-2 md:p-4">
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
