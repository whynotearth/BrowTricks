<template>
  <div>
    <div class="grid grid-cols-3 sm:grid-cols-4 gap-1">
      <slot name="uploadButton" />
      <div
        class="upload-previews-wrapper"
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
          :file="{
            ...file,
            index,
            thumbnail: getCloudinaryVideoThumbnail(file.url)
          }"
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
import { fixApiDateString, getCloudinaryVideoThumbnail } from '@/helpers';
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
      return [...this.files].sort(this.sortByDate);
    }
  },
  methods: {
    getCloudinaryVideoThumbnail,
    sortByDate(itemA, itemB) {
      const dateA = new Date(fixApiDateString(itemA.createdAt));
      const dateB = new Date(fixApiDateString(itemB.createdAt));
      return dateB - dateA;
    },
    remove(file) {
      this.$emit('deleteItem', file);
    },
    selectFile(file) {
      this.selectedFileInfo = { ...file };
    },
    closeModal() {
      this.resetSelectedFile();
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
