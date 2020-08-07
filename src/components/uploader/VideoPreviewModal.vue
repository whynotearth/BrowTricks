<template>
  <vue100vh
    class="bg-black bg-opacity-high z-50 fixed w-screen inset-0 flex justify-center items-center"
  >
    <div
      class="flex flex-col items-center text-left w-full h-full relative"
      @click="closeModal"
    >
      <!-- top toolbar -->
      <div class="flex justify-end w-full">
        <button class="p-3" @click.prevent="closeModal" title="Close">
          <Close class="text-white" />
        </button>
      </div>

      <!-- content -->
      <div class="w-full my-auto">
        <video
          controls="true"
          class="preview-video mx-auto max-w-full"
          :src="video.url"
        />
      </div>

      <!-- bottom toolbar -->
      <div class="flex justify-end w-full">
        <a class="cursor-pointer p-4" @click.stop="deleteVideo" title="Delete">
          <DeleteIcon class="text-white w-6 h-6" />
        </a>

        <a
          @click.stop=""
          :href="transformCloudinaryUrl(video.url, 'fl_attachment')"
          class="cursor-pointer p-4"
          title="Download (Save the file in new tab)"
        >
          <DownloadIcon class="text-white w-6 h-6" />
        </a>
      </div>
    </div>
  </vue100vh>
</template>

<script>
import Close from '@/assets/icons/close.svg';
import DeleteIcon from '@/assets/icons/delete.svg';
import DownloadIcon from '@/assets/icons/download.svg';
import { transformCloudinaryUrl } from '@/helpers.js';
import vue100vh from 'vue-100vh';

export default {
  name: 'VideoPreviewModal',
  props: ['video'],
  components: { vue100vh, Close, DeleteIcon, DownloadIcon },
  methods: {
    transformCloudinaryUrl,
    closeModal() {
      this.$emit('resetSelectedVideo');
    },
    deleteVideo() {
      this.$emit('deleteVideo', this.video.index);
      this.closeModal();
    }
  }
};
</script>

<style scoped>
.preview-video {
  max-height: calc(100vh - 112px);

  @apply bg-gray-200;
}
</style>
