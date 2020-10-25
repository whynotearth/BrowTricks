<template>
  <div
    class="flex flex-col items-center w-full text-left min-h-vh100--without-header"
  >
    <div
      class="w-full flex justify-end items-center py-4 px-4 tg-body-bold-mobile"
    >
      <div class="h-5">
        <a
          v-if="activeStep !== images.length - 1"
          @click.stop="SkipAll"
          class="text-on-primary cursor-pointer"
        >
          Skip
        </a>
      </div>
    </div>

    <!-- preload slider images -->
    <link
      v-for="image in images"
      :key="image"
      rel="preload"
      :href="image"
      as="image"
    />
    <!-- background image of tenant home  -->
    <link
      rel="preload"
      href="https://res.cloudinary.com/whynotearth/image/upload/v1601297195/BrowTricks/static_v2/rosegold-pattern2_hstttj.jpg"
      as="image"
    />

    <div
      class="image-wrapper max-w-md px-4 overflow-x-hidden select-none flex items-end pb-6"
    >
      <transition name="slide" mode="out-in">
        <img class="max-h-full" :src="activeImage" :key="activeImage" alt="" />
      </transition>
    </div>
    <div
      class="flex flex-col items-center flex-grow w-full py-8 bg-surface rounded-t-xl"
    >
      <div class="max-w-full tg-body-mobile">
        <BaseSlider
          @slideChange="onSlideChange"
          class="max-w-full mb-8"
          ref="slider"
        >
          <div class="keen-slider__slide px-4">
            <div class="max-w-md text-center">
              <h2 class="tg-h1-mobile mb-5">Welcome to<br />{{ SHORTNAME }}</h2>
              <p>
                Easily manage your clients and rock your relationships. Organize
                and store all client communication, notes, photos, videos, and
                custom form creation!
              </p>
            </div>
          </div>
          <div class="keen-slider__slide px-4">
            <div class="max-w-md text-center">
              <h2 class="tg-h1-mobile mb-5">Clean up your phone storage</h2>
              <p>
                Organize your client photos onto client profiles. Easily share
                stored photos, to social media or you client. AND Videos too!
              </p>
            </div>
          </div>
          <div class="keen-slider__slide px-4">
            <div class="max-w-md text-center">
              <h2 class="tg-h1-mobile mb-5">Create Custom PMU Forms</h2>
              <p>
                Use our pre-build form templates, or easily create your own.
                Send forms via SMS to complete before their appointment.
              </p>
            </div>
          </div>
          <div class="keen-slider__slide px-4">
            <div class="max-w-md text-center">
              <h2 class="tg-h1-mobile mb-5">
                Timestamped Notes Keep you Organized
              </h2>
              <p>
                Track your client details, communication, reminders and more.
              </p>
            </div>
          </div>
        </BaseSlider>
      </div>

      <div class="pb-20">
        <transition name="fadefast" mode="in-out">
          <Button
            @clicked="goStep(activeStep + 1)"
            title="Next Step"
            :background="null"
            :isBordered="true"
            v-if="activeStep !== images.length - 1"
          />
          <Button title="Let's Get Started" v-else @clicked="SkipAll" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSlider from '@/components/BaseSlider';
export default {
  name: 'TenantIntro',
  components: { BaseSlider },
  data: () => ({
    activeStep: 0
  }),
  computed: {
    SHORTNAME() {
      return process.env.VUE_APP_SHORTNAME;
    },
    images() {
      return [
        'https://res.cloudinary.com/whynotearth/image/upload/v1603358970/BrowTricks/static_v2/intro-1_vem73u.png',
        'https://res.cloudinary.com/whynotearth/image/upload/v1603358969/BrowTricks/static_v2/intro-2_ho9wnp.png',
        'https://res.cloudinary.com/whynotearth/image/upload/v1603358969/BrowTricks/static_v2/intro-3_yv469e.png',
        'https://res.cloudinary.com/whynotearth/image/upload/v1603358969/BrowTricks/static_v2/intro-4_izke2p.png'
      ];
    },
    activeImage() {
      return this.images.find((item, index) => index === this.activeStep);
    }
  },
  methods: {
    onSlideChange(newSlide) {
      this.activeStep = newSlide;
    },
    goStep(index) {
      this.$refs.slider.goStep(index);
      this.activeStep = index;
    },
    SkipAll() {
      this.$router.push({ name: 'TenantHome' });
    }
  }
};
</script>

<style scoped>
.image-wrapper {
  height: 30vh;
}
</style>
