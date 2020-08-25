<template>
  <div class="bg-background has-noise flex items-center justify-center h-full">
    <div class="text-center">
      <div
        class="progress-wrapper mb-4 md:mb-12 mx-auto"
        :style="{
          width: `${metrics.totalWidth}px`,
          height: `${metrics.totalWidth}px`
        }"
      >
        <!-- mobile -->
        <BaseProgressCircle
          class="block"
          :centerX="metrics.centerX"
          :centerY="metrics.centerY"
          :radius="metrics.radius"
          :percentageProgress="progress"
        >
          <image
            class="progress-circle--content block"
            :x="metrics.imageX"
            :y="metrics.imageY"
            :width="metrics.imageWidth"
            :height="metrics.imageHeight"
            :xlink:href="logoUrl"
          ></image>
        </BaseProgressCircle>
      </div>
      <p v-if="title" class="tg-h2-mobile md:tg-h2-desktop mb-4">
        {{ title }}
      </p>
      <p v-if="message" class="tg-body-mobile md:tg-desktop-body">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script>
import BaseProgressCircle from '@/components/BaseProgressCircle.vue';
import { disableScrollbar, enableScrollbar } from '@/helpers.js';

export default {
  name: 'OverlayBrand',
  components: { BaseProgressCircle },
  data() {
    return {
      progress: 0,
      logoUrl: process.env.VUE_APP_LOGO2_URL
    };
  },
  props: {
    width: {
      type: Number,
      default: 146
    },
    title: {
      default: ''
    },
    message: {
      default: ''
    },
    isVisible: {
      default: false
    }
  },
  computed: {
    metrics() {
      const totalWidth = this.width;
      const borderWidth = 2;
      const imageX = 10;
      const imageY = 10;
      return {
        totalWidth,
        centerX: totalWidth / 2,
        centerY: totalWidth / 2,
        radius: totalWidth / 2 - borderWidth,
        imageX,
        imageY,
        imageWidth: totalWidth - 2 * imageX,
        imageHeight: totalWidth - 2 * imageY
      };
    }
  },
  beforeDestroy() {
    enableScrollbar();
  },
  mounted() {
    setTimeout(() => {
      this.progress = 1;
    }, 300);
    disableScrollbar();
  }
};
</script>
