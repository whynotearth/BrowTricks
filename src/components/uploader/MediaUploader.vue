<template>
  <CloudinaryWidget
    @uploaded="onUpload"
    :uploadPreset="uploadPreset"
    @error="onUploadError"
    :uploaderOptions="{
      maxFiles,
      maxImageWidth
    }"
    :id="id ? id : 'media_uploader_element'"
    class="flex justify-center items-center upload-add w-1/3 border border-on-newbackground border-dashed border-opacity-divider cursor-pointer"
  >
    <label class="block cursor-pointer">
      <div class="upload-icon">
        <div class="upload-icon--dimension flex justify-center items-center">
          <IconPlus class="fill-current text-white text-opacity-medium" />
        </div>
      </div>
    </label>
  </CloudinaryWidget>
</template>

<script>
import IconPlus from '@/assets/icons/plus.svg';

export default {
  name: 'MediaUploader',
  components: {
    IconPlus,
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
        let updatedFiles = [this.cloudinaryImageToMeredithImage(result.info)];
        console.log('current', this.files);
        console.log('new updatedFiles', [...this.files, ...updatedFiles]);
        this.updateFiles([...this.files, ...updatedFiles]);
      }
    },
    updateFiles(files) {
      this.$emit('change', files);
    },
    cloudinaryImageToMeredithImage(cloudinaryImageInfo) {
      const { secure_url, height, width, public_id } = cloudinaryImageInfo;
      return {
        height,
        width,
        publicId: public_id,
        url: secure_url
      };
    }
  }
};
</script>

<style scoped>
.upload-add {
  height: 168px;
  width: 120px;
}
</style>
