<template>
  <div>
    <nav class="flex w-full fixed bottom-0 bg-transparent z-30">
      <div class="flex flex-auto">
        <div class="w-full">
          <div class="flex relative bg-primary">
            <NavigationBottomLocked v-if="isLocked" />
            <NavigationBottomNormal v-else />
          </div>
        </div>
      </div>
    </nav>
    <DrawerUpload
      @close="isOpenDrawerUploadUpdate(false)"
      :isOpen="isOpenDrawerUploadGet"
    ></DrawerUpload>
  </div>
</template>

<script>
import DrawerUpload from '@/components/DrawerUpload';
import NavigationBottomLocked from '@/components/NavigationBottomLocked';
import NavigationBottomNormal from '@/components/NavigationBottomNormal';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NavigationBottom',
  data: () => ({
    isOpenDrawerUpload: false
  }),
  components: {
    NavigationBottomLocked,
    NavigationBottomNormal,
    DrawerUpload
  },
  beforeDestroy() {
    this.isOpenDrawerUploadUpdate(false);
  },
  methods: {
    ...mapActions('uploader', ['isOpenDrawerUploadUpdate'])
  },
  computed: {
    ...mapGetters('uploader', ['isOpenDrawerUploadGet']),
    ...mapGetters('navigation', ['statusGet']),
    hasActiveTenant() {
      return this.$route.params.tenantSlug;
    },
    isLocked() {
      return this.statusGet === 'locked';
    }
  }
};
</script>

<style scoped>
.wrapper {
  padding: 6px 0;
}

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
