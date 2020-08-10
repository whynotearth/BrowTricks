<template>
  <div class="mx-4">
    <div class="mb-2">
      <slot name="title">
        <span
          class="tg-h3-mobile text-white text-opacity-medium mt-8 inline-block"
        >
          Video
        </span>
      </slot>
    </div>
    <div class="flex flex-wrap">
      <CloudinaryWidget
        @uploaded="onUpload"
        :uploadPreset="uploadPreset"
        @error="onUploadError"
        :uploaderOptions="{
          maxFiles
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
        v-for="(video, index) in videosToPreview"
        :key="index"
      >
        <BaseVideoPreview
          v-if="video.url"
          :key="index"
          :selectVideo="selectVideo"
          :file="video"
          :index="index"
          :image="getThumbnail(video.url)"
        />
      </div>

      <VideoPreviewModal
        v-if="showModal"
        @deleteVideo="deleteVideo"
        @resetSelectedVideo="resetSelectedVideo"
        :video="selectedVideoInfo"
      />
    </div>
  </div>
</template>

<script>
import { transformCloudinaryUrl } from '@/helpers.js';
import VideoPreviewModal from '@/components/uploader/VideoPreviewModal.vue';
import IconPlus from '@/assets/icons/plus.svg';

const defaultVideoInfo = {
  publicId: null,
  url: '',
  index: null
};

export default {
  name: 'VideoUpload',
  props: {
    uploadPreset: {
      type: String,
      required: true
    },
    files: {
      type: Array,
      default: () => []
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
      selectedVideoInfo: { ...defaultVideoInfo }
    };
  },
  components: {
    VideoPreviewModal,
    IconPlus,
    BaseVideoPreview: () => import('./BaseVideoPreview'),
    CloudinaryWidget: () => import('./CloudinaryWidget')
  },
  computed: {
    videosToPreview() {
      return [...this.files];
    },
    showModal() {
      return (
        this.selectedVideoInfo &&
        this.selectedVideoInfo.url &&
        this.selectedVideoInfo.index >= 0
      );
    }
  },
  methods: {
    transformCloudinaryUrl,
    getThumbnail(url) {
      const transformedUrl = transformCloudinaryUrl(
        url,
        'f_auto,h_300,c_limit'
      );
      return transformedUrl.replace(/\.(mp4|mov)/, '.jpg');
    },
    deleteVideo(index) {
      let updatedFiles = this.files.slice();
      updatedFiles.splice(index, 1);
      this.updateFiles(updatedFiles);
    },
    selectVideo([file, index]) {
      this.selectedVideoInfo = { ...file, index };
    },
    resetSelectedVideo() {
      this.selectedVideoInfo = { ...defaultVideoInfo };
    },
    onUploadError(error) {
      alert(error.status);
    },
    onUpload(result) {
      if (result.event === 'success') {
        let updatedFiles = [this.cloudinaryVideoToMeredithVideo(result.info)];
        this.updateFiles([...this.files, ...updatedFiles]);
      }
    },
    updateFiles(files) {
      this.$emit('change', files);
    },
    cloudinaryVideoToMeredithVideo(cloudinaryVideoInfo) {
      const { secure_url, height, width, public_id } = cloudinaryVideoInfo;
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
  width: 120px;
  height: 168px;
}

@screen sm {
  .upload-previews-wrapper,
  .upload-add {
    width: 120px;
  }
}
</style>
