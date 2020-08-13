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
        @resetSelectedFile="resetSelectedFile"
        :file="selectedFileInfo"
      />
      <VideoPreviewModal
        v-if="selectedFileInfo.resourceType === 'video'"
        @remove="remove"
        @resetSelectedFile="resetSelectedFile"
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
  computed: {
    filesToPreview() {
      return [...this.files].map(this.addResourceType);
    }
  },
  methods: {
    addResourceType(file) {
      const resourceType = this.isImage(file)
        ? 'image'
        : this.isVideo(file)
        ? 'video'
        : 'unknown';
      return { ...file, resourceType };
    },
    isImage(file) {
      // TODO: use file.resourceType
      const urlSegments = file.url.split('.');
      const extension = urlSegments[urlSegments.length - 1];
      return ['jpg', 'jpeg', 'gif', 'png'].includes(extension.toLowerCase());
    },
    isVideo(file) {
      // TODO: use file.resourceType
      const urlSegments = file.url.split('.');
      const extension = urlSegments[urlSegments.length - 1];
      return ['mp4', 'webm', 'vob'].includes(extension.toLowerCase());
    },
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
      this.selectedFileInfo = { ...file };
    },
    resetSelectedFile() {
      this.selectedFileInfo = {
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
