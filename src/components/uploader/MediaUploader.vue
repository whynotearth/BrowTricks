<template>
  <CloudinaryWidget
    @widget-ready="$emit('widget-ready')"
    @uploaded="onUpload"
    :uploadPreset="uploadPreset"
    @error="onUploadError"
    :uploaderOptions="{
      maxFiles,
      maxImageWidth
    }"
    :id="id ? id : 'media_uploader_element'"
  >
    <slot />
  </CloudinaryWidget>
</template>

<script>
import { cloudinaryFileToMeredithFileAdapter } from '@/helpers.js';

export default {
  name: 'MediaUploader',
  components: {
    CloudinaryWidget: () => import('./CloudinaryWidget')
  },
  props: {
    uploadPreset: {
      type: String,
      required: true
    },
    files: {
      type: Array,
      default: () => []
    },
    maxImageWidth: {
      type: Number,
      default: parseInt(process.env.VUE_APP_UPLOADER_MAX_IMAGE_WIDTH)
    },
    maxFiles: {
      type: Number,
      default: parseInt(process.env.VUE_APP_UPLOADER_MAX_FILES)
    },
    id: {
      type: String
    }
  },
  methods: {
    onUploadError(error) {
      alert(error.status);
    },
    onUpload(result) {
      if (result.event === 'success') {
        let updatedFiles = [cloudinaryFileToMeredithFileAdapter(result.info)];
        this.updateFiles([...this.files, ...updatedFiles]);
      }
    },
    updateFiles(files) {
      this.$emit('change', files);
    }
  }
};
</script>
