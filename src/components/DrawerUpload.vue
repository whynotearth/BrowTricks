<template>
  <BaseDrawerActions :isOpen="isOpen" @close="$emit('close')" title="Upload">
    <ul class="text-on-background text-opacity-high tg-body-mobile">
      <li>
        <MediaUploader
          :maxFiles="1"
          id="image_uploader"
          :files="currentFiles"
          @change="updateFiles"
          :uploadPreset="uploadPresetImage"
        >
          <a
            tabindex="0"
            class="flex justify-between w-full p-4 cursor-pointer"
            aria-labelledby="link-upload-image"
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
        >
          <a
            tabindex="0"
            class="flex justify-between w-full p-4 cursor-pointer"
            aria-labelledby="link-upload-video"
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
    async _fetchClient() {
      this.client = await this.fetchClient({
        params: {
          clientId: this.clientId,
          tenantSlug: this.tenantSlug
        }
      }).catch(() => {
        console.log('error in getting client');
      });
    },
    updateFiles(files) {
      console.log('files before updatefiles', files);
      const filesAdapted = files.map(item => ({
        ...item,
        url: item.url,
        publicId: item.publicId
      }));
      this.uploadedFilesUpdate(filesAdapted);
      console.log('files after', filesAdapted);
      this.$router.push({ name: 'ClientUpload' });
    }
  }
};
</script>

<style scoped></style>
