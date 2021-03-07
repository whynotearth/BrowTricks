<template>
  <component
    :is="isLarge ? 'RatioBox' : 'div'"
    :ratio="9 / 16"
    class="relative"
  >
    <!-- background video -->
    <VideoSimple
      class="absolute inset-0 w-full hidden md:block z-0"
      url="https://res.cloudinary.com/whynotearth/video/upload/v1606128043/BrowTricks/static_v2/home-hero_rwvppq.mp4"
    />
    <!-- text content -->
    <div
      class="flex flex-col justify-between max-w-4xl mx-auto h-full z-10 relative"
    >
      <div class="flex flex-col justify-center flex-grow">
        <VideoSimple
          class="w-full block md:hidden z-0"
          url="https://res.cloudinary.com/whynotearth/video/upload/v1606128043/BrowTricks/static_v2/home-hero_rwvppq.mp4"
        />

        <div class="py-16 md:py-0">
          <div class="px-4">
            <h2 class="text-center tg-h1-mobile md:tg-h1-desktop mb-8">
              You be a brow boss, let us do the organizing.
            </h2>
            <h1 class="tg-h3-mobile md:tg-h1-mobile mb-8">
              {{ APPNAME }}. {{ SLOGAN }}
            </h1>
          </div>

          <div
            class="flex flex-col sm:flex-row mt-6 items-center justify-center"
          >
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
            <Button
              v-if="isMobile"
              class="cta-button mb-4 sm:mb-0"
              margin="mx-4"
              :width="null"
              background="bg-brand6"
              textColor="text-on-brand6"
              radius="rounded-md"
              title="Log in"
              :to="{ name: 'AuthLogin' }"
            />
            <ButtonGooglePlay v-else className="mx-4 mb-4 sm:mb-0" />
          </div>
        </div>
      </div>

      <div class="px-4">
        <p class="text-on-background mb-16">
          It’s easy & user friendly. No credit card or commitments. We promise
          you’ll love it!
        </p>
      </div>
    </div>
  </component>
</template>

<script>
import ButtonGooglePlay from '@/components/inputs/ButtonGooglePlay';
import VideoSimple from '@/components/player/VideoSimple';
import RatioBox from '@/components/RatioBox';
import { isIE } from '@/helpers';

export default {
  name: 'ContentHero',
  components: { ButtonGooglePlay, VideoSimple, RatioBox },
  data: () => ({
    pageWidth: window.innerWidth
  }),

  mounted() {
    this.resizeListener();
  },

  methods: {
    resizeListener() {
      const eventConfig = isIE ? false : { passive: true };
      window.addEventListener('resize', this.onResize, eventConfig);
      this.$on('hook:beforeDestroy', () => {
        window.removeEventListener('resize', this.onResize, eventConfig);
      });
    },
    onResize() {
      this.pageWidth = window.innerWidth;
    }
  },

  computed: {
    isLarge() {
      // tailwindConfig: theme.screens.md => 768
      return this.pageWidth >= 768;
    },
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
.cta-button {
  width: 148px;
}
</style>
