<template>
  <div class="mx-4">
    <div class="mb-2">
      <slot name="title">
        <span
          class="tg-h3-mobile text-white text-opacity-medium mt-8 inline-block"
        >
          Image
        </span>
      </slot>
    </div>
    <div class="flex flex-wrap">
      <CloudinaryWidget
        @uploaded="onUpload"
        :uploadPreset="uploadPreset"
        :uploaderOptions="{
          maxFiles,
          maxImageWidth
        }"
        :id="id ? id : 'upload_widget'"
        class="upload-add w-1/3"
      >
        <label class="bg-background block cursor-pointer">
          <div class="upload-icon">
            <div
              class="upload-icon--dimension border border-on-background border-dashed border-opacity-divider flex justify-center items-center"
            >
              <IconPlus
                class="fill-current text-newprimary text-opacity-medium"
              />
            </div>
          </div>
        </label>
      </CloudinaryWidget>
      <div
        class="upload-previews-wrapper w-1/3"
        v-for="(image, index) in imagesToPreview"
        :key="index"
      >
        <BaseImagePreview
          v-if="image.url"
          :selectImage="selectImage"
          :key="index"
          :image="image.url"
          :index="index"
        />
      </div>
      <ImagePreviewModal
        v-if="
          selectedImageInfo &&
            selectedImageInfo.url &&
            selectedImageInfo.index >= 0
        "
        @deleteImage="deleteImage"
        @resetSelectedImage="resetSelectedImage"
        :image.sync="selectedImageInfo"
      />
    </div>
  </div>
</template>

<script>
import IconPlus from '@/assets/icons/plus.svg';

export default {
  name: 'ImageUpload',
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
  data() {
    return {
      images: [],
      selectedImageInfo: {
        url: '',
        index: null
      }
    };
  },
  components: {
    IconPlus,
    BaseImagePreview: () => import('./BaseImagePreview'),
    ImagePreviewModal: () => import('./ImagePreviewModal'),
    CloudinaryWidget: () => import('./CloudinaryWidget')
  },
  computed: {
    imagesToPreview() {
      return [...this.files];
    }
  },
  methods: {
    deleteImage(index) {
      let updatedFiles = this.files.slice();
      updatedFiles.splice(index, 1);
      this.updateFiles(updatedFiles);
    },
    selectImage([url, index]) {
      this.selectedImageInfo.url = url;
      this.selectedImageInfo.index = index;
    },
    resetSelectedImage() {
      this.selectedImageInfo = {
        url: '',
        index: null
      };
    },
    onUpload(result) {
      if (result.event === 'success') {
        let updatedFiles = [this.cloudinaryImageToMeredithImage(result.info)];
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
.upload-icon--dimension,
.upload-img--dimension {
  height: 168px;
}

.upload-previews-wrapper,
.upload-add {
  height: 168px;
}

@screen sm {
  .upload-previews-wrapper,
  .upload-add {
    width: 120px;
  }
}
</style>
