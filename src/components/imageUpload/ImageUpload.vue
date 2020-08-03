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
        @opened="onUploaderOpened"
        :uploaderOptions="{
          maxFiles,
          maxImageWidth
        }"
        :id="id ? id : 'upload_widget'"
      >
        <label
          class="bg-background block cursor-pointer"
          for="add-post-image-upload"
        >
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
        class="upload-previews-wrapper"
        v-for="(image, index) in imagesToPreview"
        :key="index"
      >
        <BaseImagePreview
          v-if="image.secure_url"
          :selectImage="selectImage"
          :key="index"
          :image="image.secure_url"
          :index="index"
        />
      </div>
      <ImagePreviewModal
        v-if="
          selectedImageInfo &&
            selectedImageInfo.secure_url &&
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
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    maxImageWidth: {
      type: Number,
      default: parseInt(process.env.VUE_APP_UPLOADER_MAX_IMAGE_WIDTH)
    },
    maxFiles: {
      type: Number,
      default: parseInt(process.env.VUE_APP_UPLOADER_MAX_FILES)
    },
    defaultImages: {
      type: Array
    },
    value: {
      type: Array,
      required: true
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      images: [],
      imagesToPreview: [],
      selectedImageInfo: {
        secure_url: '',
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
  mounted() {
    if (this.defaultImages && this.defaultImages.length > 0) {
      this.images = [...this.defaultImages];
      this.imagesToPreview = [...this.defaultImages];
    }
  },
  methods: {
    deleteImage(index) {
      this.images.splice(index, 1);
      this.$emit('change', [...this.images]);
    },
    selectImage([secure_url, index]) {
      this.selectedImageInfo.secure_url = secure_url;
      this.selectedImageInfo.index = index;
    },
    resetSelectedImage() {
      this.selectedImageInfo = {
        secure_url: '',
        index: null
      };
    },
    onUploaderOpened() {
      //
    },
    onUpload(result) {
      if (result.event === 'success') {
        const images = [this.getCloudinaryImageAdaptedObject(result.info)];
        this.images = [...this.images, ...images];
        this.$emit('change', [...this.images]);
      }
    },
    getCloudinaryImageAdaptedObject(cloudinaryImageInfo) {
      const { secure_url, height, width, public_id } = cloudinaryImageInfo;
      return {
        secure_url,
        height,
        width,
        public_id
      };
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.imagesToPreview = [...val];
      }
    }
  }
};
</script>

<style scoped>
.upload-icon--dimension,
.upload-img--dimension {
  width: 120px;
  height: 168px;
}

.upload-previews-wrapper {
  width: 120px;
  height: 168px;
}
</style>
