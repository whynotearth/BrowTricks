<template>
  <div class="hero-wrapper flex items-center max-w-4xl mx-auto relative">
    <div class="flex flex-col items-center justify-center">
      <div class="px-4">
        <h2 class="hero-h2 tg-h1-mobile mb-8">
          You be a brow boss, let us do the organizing.
        </h2>
        <h1 class="tg-h3-mobile md:tg-h1-mobile mb-8">
          {{ APPNAME }}. {{ SLOGAN }}
        </h1>
      </div>

      <div class="flex flex-col sm:flex-row mt-6 items-center justify-center">
        <Button
          class="cta-button mb-4 sm:mb-0"
          margin="mx-4"
          :width="null"
          background="bg-brand6"
          textColor="text-on-brand6"
          radius="rounded-md"
          title="Sign Up"
          :to="{ name: 'AuthSignup' }"
        />

        <ButtonGooglePlay className="mx-4" />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonGooglePlay from '@/components/inputs/ButtonGooglePlay';
export default {
  name: 'ContentHero',
  components: { ButtonGooglePlay },
  computed: {
    APPNAME() {
      return process.env.VUE_APP_NAME;
    },
    SLOGAN() {
      return process.env.VUE_APP_SLOGAN;
    }
  }
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
.cta-button {
  width: 148px;
}
</style>
