<template>
  <div class="hero-wrapper flex items-center max-w-4xl mx-auto relative">
    <div class="flex flex-col items-center justify-center">
      <div class="px-4">
        <h2 class="hero-h2 tg-h1-mobile mb-8">
          All you need to do is show up at the right time
        </h2>
        <h3 class="tg-h3-mobile md:tg-h1-mobile mb-8">
          Your online assistant, working 24/7 to fill your schedule.
        </h3>
      </div>

      <Button
        background="bg-brand6"
        textColor="text-on-brand6"
        maxWidth="max-w-240"
        radius="rounded-md"
        title="Try it now"
        class="mb-6"
        :to="{ name: 'AuthSignup' }"
      />

      <!-- <a href="" title="download on Google Play">
        <img src="https://res.cloudinary.com/whynotearth/image/upload/v1604305045/BrowTricks/static_v2/google-play_gz9egz.png" alt="Google Play">
      </a> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentHero'
};
</script>

<style scoped>
.hero-wrapper {
  height: calc(100 * var(--vh) - var(--header-height) - 80px);
}
@screen md {
  .hero-h2 {
    font-family: ChampagneLimousines, sans-serif;
    font-weight: normal;
    font-size: 72px;
    line-height: 1;
    text-align: center;
  }
}
</style>
