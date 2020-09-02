<template>
  <div>
    <div class="mb-2">
      <slot name="title">
        <span
          class="tg-h3-mobile text-on-background text-opacity-medium mt-8 inline-block"
        >
          Image
        </span>
      </slot>
    </div>
    <div class="flex flex-wrap">
      <slot name="uploadButton" />
      <div
        class="upload-previews-wrapper w-1/3"
        v-for="(file, index) in filesToPreview"
        :key="index"
      >
        <BaseImagePreview
          v-if="file.resourceType === 'image'"
          :selectFile="selectFile"
          :key="index"
          :file="{ ...file, index }"
        />
        <BaseVideoPreview
          v-if="file.resourceType === 'video'"
          :selectFile="selectFile"
          :key="index"
          :file="{ ...file, index, thumbnail: getThumbnail(file) }"
        />
      </div>
      <ImagePreviewModal
        v-if="selectedFileInfo.resourceType === 'image'"
        @remove="remove"
        @close="closeModal"
        :file="selectedFileInfo"
      />
      <VideoPreviewModal
        v-if="selectedFileInfo.resourceType === 'video'"
        @remove="remove"
        @close="closeModal"
        :file="selectedFileInfo"
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
      selectedFileInfo: {
        url: '',
        index: null
      }
    };
  },
  components: {
    BaseImagePreview: () => import('./BaseImagePreview'),
    BaseVideoPreview: () => import('./BaseVideoPreview'),
    ImagePreviewModal: () => import('./ImagePreviewModal'),
    VideoPreviewModal: () => import('./VideoPreviewModal')
  },
  mounted() {
    this.initialItemRouteActivation();
  },
  computed: {
    filesToPreview() {
      return [...this.files];
    }
  },
  methods: {
    getThumbnail(file) {
      const urlSegments = file.url.split('.');
      const extension = urlSegments[urlSegments.length - 1];
      const thumbnail = file.url.replace(new RegExp(extension + '$'), 'jpg');
      return thumbnail;
    },
    remove(index) {
      let updatedFiles = this.files.slice();
      updatedFiles.splice(index, 1);
      this.updateFiles(updatedFiles);
    },
    selectFile(file) {
      this.goToItemRoute(file);
      this.selectedFileInfo = { ...file };
    },
    closeModal() {
      this.resetSelectedFile();
      this.goToListRoute();
    },
    resetSelectedFile() {
      this.selectedFileInfo = {
        url: '',
        index: null
      };
    },
    goToItemRoute(file) {
      if (this.$route.name === 'ClientUploads') {
        this.$router
          .push({
            name: 'ClientUploadsItem',
            params: { mediaIndex: file.index }
          })
          .catch(() => {});
      }
    },
    goToListRoute() {
      if (this.$route.name === 'ClientUploadsItem') {
        this.$router.go(-1);
      }
    },
    updateFiles(files) {
      this.$emit('change', files);
    },
    initialItemRouteActivation() {
      const unwatch = this.$watch('files', () => {
        if (this.$route.name === 'ClientUploadsItem') {
          const mediaIndex = this.$route.params.mediaIndex;
          const currentFile = this.files[mediaIndex];
          this.selectFile(currentFile);
          unwatch();
        } else {
          unwatch();
        }
      });
    }
  },
  watch: {
    $route(to) {
      if (to.name === 'ClientUploads') {
        this.resetSelectedFile();
      }
    }
  }
};
</script>

<style scoped>
.upload-icon--dimension,
.upload-img--dimension {
  width: 100px;
  height: 100px;
}

.upload-previews-wrapper,
.upload-add {
  width: 100px;
  height: 100px;
  margin: 0 0.1rem 0 0.1rem;
}

@screen sm {
  .upload-previews-wrapper,
  .upload-add {
    width: 100px;
  }
}
</style>
