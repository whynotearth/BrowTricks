<template>
  <div
    class="h-vh100 bg-black bg-opacity-high z-50 fixed w-screen top-0 left-0 flex justify-center items-center"
  >
    <div
      class="flex flex-col items-center text-left w-full h-full relative"
      @click="closeModal"
    >
      <!-- top toolbar -->
      <div class="flex justify-start w-full flex-shrink-0">
        <button class="p-3" @click.prevent="closeModal" title="Close">
          <Close class="text-white" />
        </button>
      </div>

      <!-- content -->
      <div class="m-auto">
        <div @click.stop="">
          <video controls="true" class="preview-video" :src="file.url" />
        </div>
      </div>

      <!-- bottom toolbar -->
      <div class="flex justify-end w-full flex-shrink-0">
        <!-- share -->
        <a
          v-if="isShareApiSupported"
          @click.stop="share(file)"
          class="cursor-pointer p-4"
          title="Share"
        >
          <ShareIcon class="text-white w-6 h-6" />
        </a>

        <a
          v-else
          @click.stop=""
          :href="transformCloudinaryUrl(file.url, 'fl_attachment')"
          class="cursor-pointer p-4"
          title="Download"
        >
          <DownloadIcon class="text-white w-6 h-6" />
        </a>

        <a class="cursor-pointer p-4" @click.stop="deleteVideo" title="Delete">
          <DeleteIcon class="text-white w-6 h-6" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Close from '@/assets/icons/close.svg';
import DeleteIcon from '@/assets/icons/delete.svg';
import DownloadIcon from '@/assets/icons/download.svg';
import ShareIcon from '@/assets/icons/share.svg';
import {
  transformCloudinaryUrl,
  urlToFile,
  share,
  isShareApiSupported
} from '@/helpers.js';
import noPageScrollbarMixin from '@/utils/noPageScrollbarMixin.js';

export default {
  name: 'VideoPreviewModal',
  mixins: [noPageScrollbarMixin],
  props: ['file'],
  components: { Close, DeleteIcon, DownloadIcon, ShareIcon },
  data: () => ({
    isShareApiSupported
  }),
  methods: {
    transformCloudinaryUrl,
    urlToFile,
    share,
    closeModal() {
      this.$emit('close');
    },
    deleteVideo() {
      this.$emit('remove', this.file);
      this.closeModal();
    }
  }
};
</script>

<style scoped>
.preview-video {
  max-height: calc(100vh - 112px);
  max-height: calc(100 * var(--vh) - 112px);

  @apply bg-gray-200;
}
</style>
