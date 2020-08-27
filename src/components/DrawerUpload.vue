<template>
  <BaseDrawerActions :isOpen="isOpen" @close="$emit('close')" title="Upload">
    <ul class="text-on-background text-opacity-high tg-body-mobile">
      <li>
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
      </li>
      <li>
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
      </li>
    </ul>
  </BaseDrawerActions>
</template>

<script>
import IconImages from '@/assets/icons/images.svg';
import IconVideos from '@/assets/icons/videos.svg';
import BaseDrawerActions from '@/components/BaseDrawerActions';
export default {
  name: 'DrawerUpload',
  components: { BaseDrawerActions, IconImages, IconVideos },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped></style>
