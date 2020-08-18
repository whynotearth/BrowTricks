<template>
  <div id="app" class="min-h-vh100 h-full text-center font-sans">
    <SlideBack>
      <component
        :is="this.$route.meta.layout || 'div'"
        class="h-full min-h-vh100"
      >
        <SlideBack>
          <router-view />
        </SlideBack>
      </component>
    </SlideBack>
    <transition name="fade">
      <div
        v-if="overlayModel.title || overlayModel.message"
        class="w-full h-full fixed block top-0
        left-0 z-110"
      >
        <transition :name="transitionName">
          <router-view />
        </transition>
      </component>
    </transition>
  </div>
</template>
<script>
import BaseOverlaySuccess from '@/components/BaseOverlaySuccess.vue';
import { mapGetters } from 'vuex';
import vhFix from '@/mixins/vhFix.js';
import SlideBack from '@/components/animations/SlideBack.vue';

export default {
  name: 'App',
  data() {
    return {
      transitionName: ''
    };
  },
  mixins: [vhFix],
  components: { BaseOverlaySuccess, SlideBack },
  computed: {
    ...mapGetters('overlay', {
      overlayModel: 'model'
    })
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-left' : 'fade';
    }
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

.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: all 0.5s ease-in-out;
}
.slide-left-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
