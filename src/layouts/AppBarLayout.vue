<template>
  <div class="min-h-vh100 w-full bg-primary flex flex-col">
    <BaseHeader
      v-if="appBar"
      :routeBack="meta.routeBack"
      :background="null"
      :title="appBar.title"
    />
    <transition name="fade">
      <router-view class="mx-auto box-border h-full flex-grow" />
    </transition>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue';

export default {
  name: 'AppBarLayout',
  components: {
    BaseHeader
  },
  computed: {
    appBar() {
      return this.$route.meta.appBar;
    },
    meta() {
      return this.$route.meta;
    }
  }
};
</script>
