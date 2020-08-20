<template>
  <div
    id="app"
    class="min-h-vh100 h-full text-center font-sans bg-background background-noise"
  >
    <component
      :is="this.$route.meta.layout || 'div'"
      class="h-full min-h-vh100"
    >
      <router-view />
    </component>
    <transition name="fade">
      <div
        v-if="overlayModel.title || overlayModel.message"
        class="w-full h-full fixed block top-0
        left-0 z-110"
      >
        <BaseOverlaySuccess
          :title="overlayModel.title"
          :message="overlayModel.message"
        />
      </div>
    </transition>
  </div>
</template>
<script>
import BaseOverlaySuccess from '@/components/BaseOverlaySuccess.vue';
import { mapGetters } from 'vuex';
import vhFix from '@/mixins/vhFix.js';

export default {
  name: 'App',
  mixins: [vhFix],
  components: { BaseOverlaySuccess },
  computed: {
    ...mapGetters('overlay', {
      overlayModel: 'model'
    })
  }
};
</script>
<style>
html,
body {
  scroll-behavior: smooth;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
