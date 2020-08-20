<template>
  <div id="app" class="min-h-vh100 h-full text-center font-sans">
    <transition :name="transitionName">
      <component
        :is="this.$route.meta.layout || 'div'"
        class="h-full min-h-vh100"
      >
        <router-view />
      </component>
    </transition>
  </div>
</template>
<script>
import BaseOverlaySuccess from '@/components/BaseOverlaySuccess.vue';
import { mapGetters } from 'vuex';
import vhFix from '@/mixins/vhFix.js';

export default {
  name: 'App',
  data() {
    return {
      transitionName: ''
    };
  },
  mixins: [vhFix],
  components: { BaseOverlaySuccess },
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
