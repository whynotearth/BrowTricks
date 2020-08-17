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
      <div class="w-full my-auto">
        <img
          @click.stop=""
          class="preview-image mx-auto block max-w-full"
          :src="file.url"
          alt=""
        />
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

        <!-- download -->
        <a
          v-else
          @click.stop=""
          :href="transformCloudinaryUrl(file.url, 'fl_attachment')"
          class="cursor-pointer p-4"
          title="Download (Save the file in new tab)"
        >
          <DownloadIcon class="text-white w-6 h-6" />
        </a>

        <!-- delete -->
        <a class="cursor-pointer p-4" @click.stop="remove" title="Delete">
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
import { transformCloudinaryUrl, urlToFile, share } from '@/helpers.js';

export default {
  name: 'ImagePreviewModal',
  props: ['file'],
  components: { Close, DeleteIcon, DownloadIcon, ShareIcon },
  computed: {
    isShareApiSupported() {
      return !!window.navigator.share;
    }
  },
  methods: {
    transformCloudinaryUrl,
    urlToFile,
    share,
    closeModal() {
      this.$emit('close');
    },
    remove() {
      this.$emit('remove', this.file.index);
      this.closeModal();
    }
  }
};
</script>

<style scoped>
.preview-image {
  max-height: calc(100vh - 112px);
  max-height: calc(100 * var(--vh) - 112px);
}
</style>
