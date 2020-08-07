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
        <img
          @click.stop=""
          class="preview-image mx-auto block max-w-full"
          :src="image.url"
          alt=""
        />
      </div>

      <!-- bottom toolbar -->
      <div class="flex justify-end w-full">
        <a class="cursor-pointer p-4" @click.stop="deleteImage" title="Delete">
          <DeleteIcon class="text-white w-6 h-6" />
        </a>

        <a
          @click.stop=""
          :href="transformCloudinaryUrl(image.url, 'fl_attachment')"
          class="cursor-pointer  p-4"
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
  name: 'ImagePreviewModal',
  props: ['image'],
  components: { vue100vh, Close, DeleteIcon, DownloadIcon },
  methods: {
    transformCloudinaryUrl,
    closeModal() {
      this.$emit('resetSelectedImage');
    },
    deleteImage() {
      this.$emit('deleteImage', this.image.index);
      this.closeModal();
    }
  }
};
</script>

<style scoped>
.preview-image {
  max-height: calc(100vh - 112px);
}
</style>
