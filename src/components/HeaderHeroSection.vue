<template>
  <div class="hero-section py-8 px-6">
    <div
      class="account-header flex flex-col justify-center items-center max-w-md mx-auto px-6 py-4 border-6 border-brand2 bg-background"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderHeroSection'
};
</script>
