<template>
  <transition name="fadefast" mode="in-out">
    <SplashOverlayContent v-if="isVisible" />
  </transition>
</template>

<script>
import SplashOverlayContent from '@/components/splash/SplashOverlayContent.vue';
const SPLASH_TIMEOUT = 1500;

export default {
  name: 'Splash',
  components: {
    SplashOverlayContent
  },
  data: () => ({
    isVisible: true
  }),
  mounted() {
    setTimeout(() => {
      this.isVisible = false;
    }, SPLASH_TIMEOUT);
  }
};
</script>
