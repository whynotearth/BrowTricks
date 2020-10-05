<template>
  <!-- Client drawer upload -->
  <BaseDrawerActions :isOpen="isOpen" @close="$emit('close')" title="Upload">
    <ul class="text-on-background text-opacity-high tg-body-mobile">
      <li>
        <MediaUploader
          :maxFiles="1"
          id="image_uploader"
          :files="currentFiles"
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
          id="video_uploader"
          :files="currentFiles"
          @change="updateFiles"
          :uploadPreset="uploadPresetVideo"
          @widget-ready="cloudinaryWidgetVideoIsLoaded = true"
        >
          <a
            tabindex="0"
            class="flex justify-between w-full p-4 cursor-pointer"
            aria-labelledby="link-upload-video"
            :class="[!cloudinaryWidgetVideoIsLoaded ? 'opacity-disabled' : '']"
          >
            <span class="flex items-center">
              <IconVideos
                class="h-6 w-6 fill-current mr-4 text-on-background text-opacity-medium"
              />
              <span
                id="link-upload-video"
                class="text-on-background text-opacity-high"
                >Video</span
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
import IconVideos from '@/assets/icons/videos.svg';
import BaseDrawerActions from '@/components/BaseDrawerActions';
import MediaUploader from '@/components/uploader/MediaUploader';
import { mapActions } from 'vuex';
import { get } from 'lodash-es';

export default {
  name: 'DrawerUpload',
  components: { MediaUploader, BaseDrawerActions, IconImages, IconVideos },
  data() {
    return {
      cloudinaryWidgetImageIsLoaded: false,
      cloudinaryWidgetVideoIsLoaded: false,
      uploadPresetImage: process.env.VUE_APP_UPLOADER_IMAGE_PRESET,
      uploadPresetVideo: process.env.VUE_APP_UPLOADER_VIDEO_PRESET,
      client: null
    };
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentFiles() {
      return [
        ...get(this.client, 'images', []).map(item => ({
          ...item,
          resourceType: 'image'
        })),
        ...get(this.client, 'videos', []).map(item => ({
          ...item,
          resourceType: 'video'
        }))
      ];
    }
  },
  methods: {
    ...mapActions('client', ['updateClient', 'fetchClient']),
    ...mapActions('uploader', ['uploadedFilesUpdate']),
    updateFiles(files) {
      const optionalClientId = this.$route.params.clientId;
      const filesAdapted = files.map(item => ({
        ...item,
        url: item.url,
        publicId: item.publicId
      }));
      this.uploadedFilesUpdate(filesAdapted);
      this.$router.push({
        name: 'ClientUpload',
        query: { clientId: optionalClientId }
      });
    }
  }
};
</script>

<style scoped></style>
