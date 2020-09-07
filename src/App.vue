<template>
  <div
    id="app"
    class="min-h-vh100 h-full text-center font-sans bg-background has-noise text-on-background"
  >
    <transition :name="transitionName">
      <component :is="$route.meta.layout || 'div'" class="h-full min-h-vh100">
        <router-view />
      </component>
    </transition>
    <SnackBar :showSnackBar="showPrivacySnackBar">
      <div
        class="flex items-center justify-between text-on-primary w-full h-12 tg-caption-mobile leading-4 p-4 
          bg-primary"
      >
        <p>
          Gotta agree to
          <a
            class="underline cursor-pointer"
            target="_blank"
            href="https://hub.paulchrisluke.com/-temporary-slug-7a760197-2d5d-4314-876c-ade5923d6dd8"
          >
            terms and conditions
          </a>
        </p>
        <p
          class="text-button uppercase cursor-pointer"
          @click="setSnackBarCookie"
        >
          Agree
        </p>
      </div>
    </SnackBar>

    <!-- overlay message -->
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

    <DrawerAuth
      @close="isDrawerOpenAuthUpdate(false)"
      :isOpen="isDrawerOpenAuthGet"
    ></DrawerAuth>
  </div>
</template>
<script>
import BaseOverlaySuccess from '@/components/BaseOverlaySuccess.vue';
import SnackBar from '@/components/SnackBar.vue';
import { mapGetters, mapActions } from 'vuex';
import vhFix from '@/mixins/vhFix.js';
import cookie from '@/utils/cookie';
import DrawerAuth from '@/components/auth/DrawerAuth';

export default {
  name: 'App',
  data() {
    return {
      transitionName: '',
      showPrivacySnackBar: true
    };
  },
  mixins: [vhFix],
  components: { BaseOverlaySuccess, SnackBar, DrawerAuth },
  computed: {
    ...mapGetters('global', ['isDrawerOpenAuthGet']),
    ...mapGetters('overlay', {
      overlayModel: 'model'
    })
  },
  watch: {
    $route(to, from) {
      // disable transition from meta of routes, e.g. {pageTransition: {from: false}}
      const specialTransition = this.getSpecialTransitions(to, from);
      if (specialTransition) {
        this.transitionName = specialTransition;
        return;
      }

      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-left' : 'fade';
    }
  },
  beforeMount() {
    let showSnackBar = cookie.getCookie('privacy-snackbar');
    //if bannerCookie === 1 that means user has seen the banner and dismissed it
    if (showSnackBar == 1) {
      this.showPrivacySnackBar = false;
    } else {
      this.showPrivacySnackBar = true;
    }
  },
  methods: {
    ...mapActions('global', ['isDrawerOpenAuthUpdate']),
    getSpecialTransitions(to, from) {
      const list = [
        {
          from: 'MyAccountEmpty',
          to: 'MyAccount',
          transition: 'none'
        }
      ];
      const transitionItem = list.find(item => {
        return item.to === to.name && item.from === from.name;
      });
      if (transitionItem) {
        return transitionItem.transition;
      }
      return null;
    },
    setSnackBarCookie() {
      this.showPrivacySnackBar = false;
      // set cookie with name 'snackbar'. Set value to 1 which means true. Set expiration to 7 days.
      cookie.setCookie('privacy-snackbar', 1, 365);
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
