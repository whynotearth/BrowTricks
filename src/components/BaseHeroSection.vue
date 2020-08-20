<template>
  <div class="hero-header flex justify-center bg-opacity-high pt-8 px-2 pb-24">
    <div class="border-surface border-8 w-full max-w-md">
      <div class="border-8 border-transparent">
        <div
          class="bg-surface flex flex-col items-center px-4 py-6 text-center"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseHeroSection'
};
</script>

<style scoped>
.hero-header {
  background: url(https://res.cloudinary.com/whynotearth/image/upload/v1597931628/BrowTricks/static_v2/rosegold-pattern_cjmnaw.png)
    repeat center;
  background-size: 800px;
}
</style>
