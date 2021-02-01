<template>
  <div
    id="app"
    class="min-h-vh100 h-full text-center bg-background text-on-background antialiased tg-base"
  >
    <CssSafeArea background="bg-transparent" />
    <SplashOverlay v-if="!isMobile" />
    <Alerter />

    <component :is="$route.meta.layout || 'div'">
      <router-view />
    </component>
    <SnackBar v-if="!isMobile" :showSnackBar="showPrivacySnackBar">
      <div
        class="flex items-center justify-between text-on-primary w-full h-12 leading-4 p-4 bg-primary"
      >
        <p class="tg-caption-mobile">
          Gotta agree to
          <a
            class="underline cursor-pointer tg-caption-mobile"
            target="_blank"
            href="/privacy-policy"
          >
            terms and conditions
          </a>
        </p>
        <p
          class="text-button uppercase cursor-pointer tg-caption-mobile"
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
  </div>
</template>
<script>
import BaseOverlaySuccess from '@/components/BaseOverlaySuccess.vue';
import CssSafeArea from '@/components/CssSafeArea.vue';
import Alerter from '@/components/Alerter.vue';
import SplashOverlay from '@/components/splash/SplashOverlay.vue';
import SnackBar from '@/components/SnackBar.vue';
import { mapGetters, mapActions } from 'vuex';
import vhFix from '@/mixins/vhFix.js';
import store from './store';
import { getFormattedMetaTitle } from './helpers';
import { get } from 'lodash-es';
const titleTemplate = process.env.VUE_APP_TITLE_TEMPLATE;

export default {
  name: 'App',
  data() {
    return {
      showPrivacySnackBar: true
    };
  },
  mixins: [vhFix],
  components: {
    CssSafeArea,
    SplashOverlay,
    Alerter,
    BaseOverlaySuccess,
    SnackBar
  },
  metaInfo() {
    const title =
      getFormattedMetaTitle(
        get(this.$route, 'meta.title', '') ||
          get(this.$route, 'meta.appBar.title', '')
      ) || undefined;
    return {
      title,
      titleTemplate: title ? titleTemplate : undefined
    };
  },
  computed: {
    ...mapGetters('global', ['isDrawerOpenAuthGet']),
    ...mapGetters('overlay', {
      overlayModel: 'model'
    }),
    isMobile() {
      return process.env.VUE_APP_MOBILE === 'true';
    }
  },
  beforeCreate() {
    store.dispatch('auth/refreshToken');
  },
  beforeMount() {
    let showSnackBar = localStorage.getItem('privacy-snackbar');
    //if bannerCookie is true (or 1) that means user has seen the banner and dismissed it
    if (showSnackBar) {
      this.showPrivacySnackBar = false;
    } else {
      this.showPrivacySnackBar = true;
    }
  },
  methods: {
    ...mapActions('auth', ['refreshToken']),
    ...mapActions('global', ['isDrawerOpenAuthUpdate']),
    setSnackBarCookie() {
      this.showPrivacySnackBar = false;
      // set cookie with name 'snackbar'. Set value to 1 which means true. Set expiration to 7 days.
      localStorage.setItem('privacy-snackbar', 1, 365);
    }
  }
};
</script>
