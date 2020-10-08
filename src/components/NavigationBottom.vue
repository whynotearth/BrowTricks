<template>
  <div>
    <nav class="flex w-full fixed bottom-0 bg-transparent z-30">
      <div class="flex flex-auto w-full">
        <div class="w-full">
          <div class="relative bg-on-background rounded-t-2xl">
            <NavigationBottomLinks />
          </div>
        </div>
      </div>
    </nav>
    <DrawerUpload
      @close="openDrawerUploadUpdate(false)"
      :isOpen="openDrawerUploadGet === UploaderTypes.CLIENT"
    ></DrawerUpload>
  </div>
</template>

<script>
import DrawerUpload from '@/components/DrawerUpload';
import NavigationBottomLinks from '@/components/NavigationBottomLinks';
import { mapGetters, mapActions } from 'vuex';
import { UploaderTypes } from '@/services/uploader.js';

export default {
  name: 'NavigationBottom',
  data: () => ({
    openDrawerUpload: false
  }),
  components: {
    NavigationBottomLinks,
    DrawerUpload
  },
  beforeDestroy() {
    this.openDrawerUploadUpdate(false);
  },
  methods: {
    ...mapActions('uploader', ['openDrawerUploadUpdate'])
  },
  computed: {
    ...mapGetters('uploader', ['openDrawerUploadGet']),
    UploaderTypes() {
      return UploaderTypes;
    },
    hasActiveTenant() {
      return this.$route.params.tenantSlug;
    }
  }
};
</script>

<style scoped>
.navigation--link {
  @apply opacity-medium;
}

.navigation--link svg path {
  fill: #fff;
  fill-opacity: 0.54;
}

.router-link-active {
  @apply text-on-primary opacity-100;
}

.router-link-active svg path {
  @apply opacity-100;

  fill: #fff;
  fill-opacity: 1;
}
.link-item {
  min-width: 64px;
  @apply text-center;
}
.link-items > [disabled] {
  @apply cursor-not-allowed;
}
</style>
