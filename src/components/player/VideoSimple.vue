<template>
  <div>
    <BaseSpinner borderColor="border-white" v-if="loadingVideo" />
    <video
      v-show="!loadingVideo"
      @loadeddata="loadingVideo = false"
      loop
      autoplay
      muted
      playsinline
      :src="url"
    ></video>
  </div>
</template>

<script>
import BaseSpinner from '@/components/BaseSpinner';
export default {
  name: 'VideoSimple',
  components: { BaseSpinner },
  data: () => ({ loadingVideo: true }),
  props: {
    url: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped></style>
