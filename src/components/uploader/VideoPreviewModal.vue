<template>
  <div
    class="bg-black bg-opacity-high z-50 fixed h-screen w-screen inset-0 flex justify-center items-center"
    @click="closeModal"
  >
    <div class="flex flex-col items-center text-left w-full h-full relative">
      <button
        class="p-4 absolute right-0 top-0"
        @click.prevent="closeModal"
        title="Close"
      >
        <Close class="text-white" />
      </button>
      <div @click.stop="" class="my-auto">
        <video
          controls="true"
          class="preview-video max-w-full"
          :src="video.url"
        />
      </div>

      <!-- toolbar -->
      <div class="flex justify-end w-full">
        <a class="cursor-pointer p-4" @click.stop="deleteVideo" title="Delete">
          <DeleteIcon class="text-white w-6 h-6" />
        </a>

        <a
          target="_blank"
          @click.stop=""
          :href="video.url"
          class="cursor-pointer p-4"
          title="Download (Save the file in new tab)"
        >
          <DownloadIcon class="text-white w-6 h-6" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Close from '@/assets/icons/close.svg';
import DeleteIcon from '@/assets/icons/delete.svg';
import DownloadIcon from '@/assets/icons/download.svg';

export default {
  name: 'VideoPreviewModal',
  props: ['video'],
  components: { Close, DeleteIcon, DownloadIcon },
  methods: {
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
