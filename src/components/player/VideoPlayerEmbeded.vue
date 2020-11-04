<template>
  <div class="video-wrapper">
    <link rel="stylesheet" href="https://cdn.plyr.io/3.6.2/plyr.css" />
    <video
      class="max-w-none w-full"
      aria-label="Embeded video"
      :id="idName"
      playsinline
      controls
      :poster="getCloudinaryVideoThumbnail(videoUrl, 'jpg')"
    >
      <source :src="videoUrl" type="video/mp4" />
      <!-- <source :src="changeCloudinaryExtension(reviewVideoUrl, 'webm')" type="video/webm" /> -->
    </video>
  </div>
</template>

<script>
import Plyr from 'plyr';
import {
  randomId,
  getCloudinaryVideoThumbnail
  // changeCloudinaryExtension
} from '@/helpers';
export default {
  name: 'VideoPlayerEmbeded',
  props: {
    controls: {
      type: Array,
      default: () => [
        'play-large',
        'play',
        'progress',
        // 'current-time',
        'mute',
        'volume',
        'captions',
        // 'settings',
        // 'pip',
        // 'airplay',
        'fullscreen'
      ]
    },
    idName: {
      type: String,
      default: randomId()
    },
    videoUrl: {
      type: String
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    // changeCloudinaryExtension,
    getCloudinaryVideoThumbnail,
    init() {
      new Plyr(`#${this.idName}`, {
        controls: this.controls
        // ratio: '9:16'
      });
    }
  }
};
</script>

<style scoped>
.video-wrapper {
  --plyr-color-main: #c5e2d8;
  --plyr-control-toggle-checked-background: #f6bead;
  --plyr-video-control-background-hover: #f6bead;
  --plyr-range-fill-background: #f6bead;

  /* primary: #C5E2D8;
  secondary: #E6EDF9;
  accent: #C5E2D8;
  surface: #FFFFFF;
  error: #E74323;
  success: #22c38b;
  divider: #000000;
  text-on-accent: #FFFFFF;
  on-primary: #0D1F3C;
  on-secondary: #78839C;
  on-surface: #0D1F3C;
  on-background: #000000;
  on-background-image: #ffffff;
  on-error: #FFFFFF;
  on-accent: #FFFFFF;
  brand1: #B5BBC9;
  brand2: #F6BEAD;
  brand3: #8A8A8A;
  brand4: #071108;
  brand5: #B3D1D9;
  brand6: #000000;
  on-brand6: #ffffff;
  brand7: #E9CFC4 */
}
</style>
