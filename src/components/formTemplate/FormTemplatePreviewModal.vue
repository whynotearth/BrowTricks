<template>
  <div
    class="h-vh100 bg-black bg-opacity-high z-50 fixed w-screen top-0 left-0 flex justify-center items-center"
  >
    <div
      class="flex flex-col items-center text-left w-full h-full relative"
      @click="closeModal"
    >
      <div
        class="absolute bottom-0 w-full flex flex-col justify-center content-gradient pb-14"
      >
        <div class="pt-10 px-4 text-on-background-image text-opacity-high">
          <h1 class="tg-body-mobile mb-2">
            {{ currentTemplateGet.name }}
          </h1>
          <p class="tg-caption-mobile">{{ createdAt }}</p>
        </div>

        <div class="cta-wrapper relative">
          <Button
            title="Send me a test"
            class="uppercase"
            background="bg-primary"
            textColor="text-on-primary"
          />
        </div>
      </div>

      <!-- top toolbar -->
      <div class="flex justify-start w-full flex-shrink-0">
        <button class="p-3" @click.prevent="closeModal" title="Close">
          <Close class="text-white" />
        </button>
      </div>

      <!-- content -->
      <div class="w-full my-auto overflow-y-auto bg-white flex-grow">
        <PmuFormEmptyPreview
          @imageReady="onImagePreviewReady"
          :tenantSlug="tenantSlug"
          :templateId="templateId"
        />
      </div>

      <!-- bottom toolbar -->
      <div class="flex justify-end w-full flex-shrink-0 z-10">
        <!-- share -->
        <!-- TODO: -->
        <!-- <a
          v-if="isShareApiSupported"
          @click.stop="share({ url: pdfUrl })"
          class="cursor-pointer p-4"
          title="Share"
        >
          <ShareIcon class="text-white w-6 h-6" />
        </a> -->

        <!-- download -->
        <a
          @click.stop="downloadFile"
          class="cursor-pointer p-4"
          title="Download"
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
import ShareIcon from '@/assets/icons/share.svg';
import {
  transformCloudinaryUrl,
  urlToFile,
  share,
  formatDateTime
} from '@/helpers.js';
import noPageScrollbarMixin from '@/utils/noPageScrollbarMixin.js';
import { mapGetters } from 'vuex';
import PmuFormEmptyPreview from '@/components/pmu/PmuFormEmptyPreview.vue';
import downloadjs from 'downloadjs';

export default {
  name: 'FormTemplatePreviewModal',
  data: () => ({
    imagePreviewBase64: ''
  }),
  mixins: [noPageScrollbarMixin],
  props: ['tenantSlug', 'templateId'],
  components: {
    Close,
    DeleteIcon,
    DownloadIcon,
    ShareIcon,
    PmuFormEmptyPreview
  },
  computed: {
    ...mapGetters('formTemplate', ['currentTemplateGet']),
    isShareApiSupported() {
      return !!window.navigator.share;
    },
    createdAt() {
      return formatDateTime(this.currentTemplateGet.createdAt);
    }
  },
  created() {
    console.log('currentTemplateGet', this.currentTemplateGet);
  },
  methods: {
    transformCloudinaryUrl,
    urlToFile,
    share,
    downloadFile() {
      downloadjs(
        this.imagePreviewBase64,
        `${this.currentTemplateGet.name}.jpg`,
        'image/jpg'
      );
    },
    onImagePreviewReady(imagePreviewBase64) {
      this.imagePreviewBase64 = imagePreviewBase64;
    },
    closeModal() {
      this.$emit('close');
    },
    remove() {
      this.$emit('remove', this.file);
      this.closeModal();
    }
  }
};
</script>

<style scoped>
.content-gradient {
  background: linear-gradient(180deg, transparent 0%, #000000 93.85%);
}
.cta-wrapper {
  transform: translateY(50%);
}
</style>
