<template>
  <div class="mx-4">
    <div class="mb-2">
      <slot name="title">
        <span
          class="tg-h3-mobile text-on-newbackground text-opacity-medium mt-8 inline-block"
        >
          Image
        </span>
      </slot>
    </div>
    <div class="flex flex-wrap">
      <slot name="uploadButton" />
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
        @remove="remove"
        @resetSelectedImage="resetSelectedImage"
        :image.sync="selectedImageInfo"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediaManager',
  props: {
    files: {
      type: Array,
      default: () => []
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
    BaseImagePreview: () => import('./BaseImagePreview'),
    ImagePreviewModal: () => import('./ImagePreviewModal')
  },
  computed: {
    imagesToPreview() {
      return [...this.files];
    }
  },
  methods: {
    remove(index) {
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
    updateFiles(files) {
      this.$emit('change', files);
    }
  }
};
</script>

<style scoped>
.upload-icon--dimension,
.upload-img--dimension {
  height: 168px;
}

.upload-previews-wrapper {
  height: 168px;
}

@screen sm {
  .upload-previews-wrapper {
    width: 120px;
  }
}
</style>
