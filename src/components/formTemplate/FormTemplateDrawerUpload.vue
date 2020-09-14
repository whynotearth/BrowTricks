<template>
  <BaseDrawerActions :isOpen="isOpen" @close="$emit('close')" title="Upload">
    <ul class="text-on-background text-opacity-high tg-body-mobile">
      <li>
        <MediaUploader
          :maxFiles="1"
          id="image_uploader"
          @change="updateFiles"
          :uploadPreset="uploadPresetImage"
          @widget-ready="cloudinaryWidgetImageIsLoaded = true"
        >
          <a
            tabindex="0"
            class="flex justify-between w-full p-4 cursor-pointer"
            aria-labelledby="link-upload-image"
            :class="[!cloudinaryWidgetImageIsLoaded ? 'opacity-disabled' : '']"
          >
            <span class="flex items-center">
              <IconImages
                class="h-6 w-6 fill-current mr-4 text-on-background text-opacity-medium"
              />
              <span
                id="link-upload-image"
                class="text-on-background text-opacity-high"
                >Image</span
              >
            </span>
          </a>
        </MediaUploader>
      </li>
      <li>
        <MediaUploader
          :maxFiles="1"
          id="pdf_uploader"
          @change="updateFiles"
          :uploadPreset="uploadPresetPdf"
          @widget-ready="cloudinaryWidgetPdfIsLoaded = true"
        >
          <a
            tabindex="0"
            class="flex justify-between w-full p-4 cursor-pointer"
            aria-labelledby="link-upload-pdf"
            :class="[!cloudinaryWidgetPdfIsLoaded ? 'opacity-disabled' : '']"
          >
            <span class="flex items-center">
              <IconDocument
                class="h-6 w-6 fill-current mr-4 text-on-background text-opacity-medium"
              />
              <span
                id="link-upload-pdf"
                class="text-on-background text-opacity-high"
                >PDF</span
              >
            </span>
          </a>
        </MediaUploader>
      </li>
    </ul>
  </BaseDrawerActions>
</template>

<script>
import IconImages from '@/assets/icons/images.svg';
import IconDocument from '@/assets/icons/document.svg';
import BaseDrawerActions from '@/components/BaseDrawerActions';
import MediaUploader from '@/components/uploader/MediaUploader';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FormTemplateDrawerUpload',
  components: { MediaUploader, BaseDrawerActions, IconImages, IconDocument },
  data() {
    return {
      cloudinaryWidgetImageIsLoaded: false,
      cloudinaryWidgetPdfIsLoaded: false,
      uploadPresetImage: process.env.VUE_APP_UPLOADER_IMAGE_PRESET,
      uploadPresetPdf: process.env.VUE_APP_UPLOADER_PDF_PRESET,
      client: null
    };
  },
  props: {
    fieldId: {
      type: [Number, String]
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('formTemplate', ['currentFieldGet'])
  },
  methods: {
    ...mapActions('uploader', ['uploadedFilesUpdate']),
    ...mapActions('formTemplate', ['currentFieldUpdate']),
    updateFiles(files) {
      const filesAdapted = files.map(item => ({
        ...item,
        url: item.url,
        publicId: item.publicId
      }));
      this.uploadedFilesUpdate(filesAdapted);

      let fieldType = this.getFieldType(filesAdapted[0]);

      this.updateFieldType(fieldType);

      this.$router.push({
        name: 'FormTemplateFieldEdit',
        params: { fieldId: this.fieldId },
        query: { type: fieldType }
      });
    },
    getFieldType(file) {
      const resourceType = file.resourceType;
      let fieldType;
      if (resourceType === 'pdf') {
        fieldType = 'pdf';
      }
      if (resourceType === 'image') {
        fieldType = 'image';
      }
      return fieldType;
    },
    updateFieldType(fieldType) {
      this.currentFieldUpdate({
        ...this.currentFieldGet,
        type: fieldType
      });
    }
  }
};
</script>
