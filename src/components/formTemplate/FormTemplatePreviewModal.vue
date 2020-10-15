<template>
  <div
    class="h-vh100 bg-black z-50 fixed w-screen top-0 left-0 flex justify-center items-center"
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
      <div
        class="w-full my-auto overflow-y-auto bg-white flex-grow"
        @click.stop=""
      >
        <PmuFormEmptyPreview
          :tenantSlug="tenantSlug"
          :templateId="templateId"
        />
      </div>

      <!-- caption -->
      <div
        @click.stop=""
        class="w-full content-gradient pb-16 absolute bottom-0"
      >
        <div
          class="pt-10 pb-14 px-4 text-on-background-image text-opacity-high"
        >
          <h1 class="tg-body-mobile mb-2">
            {{ currentTemplateGet.name }}
          </h1>
          <p class="tg-caption-mobile">{{ createdAt }}</p>
        </div>
      </div>

      <!-- bottom toolbar -->
      <div
        class="flex flex-col justify-center w-full z-20 relative"
        @click.stop=""
      >
        <div
          class="cta-wrapper absolute bottom-0 w-full flex items-center h-full"
        >
          <Button
            title="Preview"
            class="uppercase"
            background="bg-primary"
            textColor="text-on-primary"
            @clicked="previewFlow"
          />
        </div>

        <div class="w-full flex justify-end relative z-10">
          <!-- share -->
          <a
            v-if="isFileShareApiSupported"
            @click.stop="onClickShare"
            class="cursor-pointer p-4"
            title="Share"
          >
            <ShareIcon class="text-white w-6 h-6" />
          </a>

          <!-- download -->
          <a
            @click.stop="onClickDownload"
            class="cursor-pointer p-4"
            :class="[loadingPdf ? 'pointer-events-none' : '']"
            title="Download"
          >
            <DownloadIcon class="text-white w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Close from '@/assets/icons/close.svg';
import DownloadIcon from '@/assets/icons/download.svg';
import ShareIcon from '@/assets/icons/share.svg';
import {
  isFileShareApiSupported,
  urlToFile,
  shareDataUrl,
  formatDateTime
} from '@/helpers.js';
import noPageScrollbarMixin from '@/utils/noPageScrollbarMixin.js';
import { mapActions, mapGetters } from 'vuex';
import PmuFormEmptyPreview from '@/components/pmu/PmuFormEmptyPreview.vue';
import downloadjs from 'downloadjs';

export default {
  name: 'FormTemplatePreviewModal',
  data: () => ({
    pdfPreviewBase64: '',
    loadingPdf: false,
    isFileShareApiSupported
  }),
  mixins: [noPageScrollbarMixin],
  props: ['tenantSlug', 'templateId'],
  components: {
    Close,
    DownloadIcon,
    ShareIcon,
    PmuFormEmptyPreview
  },
  computed: {
    ...mapGetters('formTemplate', ['currentTemplateGet']),
    createdAt() {
      return formatDateTime(this.currentTemplateGet.createdAt);
    },
    previewFileName() {
      return `${this.currentTemplateGet.name}.pdf`;
    }
  },
  methods: {
    ...mapActions('tenant', ['pmuEmptyPdfPreview']),
    previewFlow() {
      this.$router.push({ name: 'PmuSignFlowMock' });
    },
    urlToFile,
    async onClickDownload() {
      if (!this.pdfPreviewBase64) {
        await this.downloadFile();
      }

      if (this.pdfPreviewBase64) {
        downloadjs(
          this.pdfPreviewBase64,
          this.previewFileName,
          'application/pdf'
        );
      }
    },
    async onClickShare() {
      if (!this.pdfPreviewBase64) {
        await this.downloadFile();
      }
      if (this.pdfPreviewBase64) {
        shareDataUrl({
          data: this.pdfPreviewBase64,
          filename: this.previewFileName
        });
      }
    },
    async downloadFile() {
      this.loadingPdf = true;
      await this.pmuEmptyPdfPreview({
        params: {
          tenantSlug: this.tenantSlug,
          templateId: this.templateId
        }
      })
        .then(response => {
          this.pdfPreviewBase64 = response;
        })
        .catch(error => {
          console.log(error);
          alert('Something went wrong in generating PDF preview');
        });
      this.loadingPdf = false;
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
  transform: translateY(-100%);
}
</style>
