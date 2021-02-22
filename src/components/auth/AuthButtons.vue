<template>
  <div class="flex flex-wrap">
    <div
      class="p-3 mx-auto"
      v-for="({ name, logo }, index) in socialMediaProviders"
      :key="index"
    >
      <Button :title="`${name}`" @clicked="openAuthentication(name)">
        <template #start>
          <!-- icon -->
          <component :is="logo" class="mr-2" />
        </template>
      </Button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import IconApple from '@/assets/icons/apple.svg';
import IconFacebook from '@/assets/icons/Facebook_OAuth.svg';
import IconGoogle from '@/assets/icons/google.svg';

export default {
  name: 'AuthButtons',
  components: {
    IconApple,
    IconFacebook,
    IconGoogle
  },
  props: {
    mode: {
      type: String,
      default: 'signup'
    }
  },
  data() {
    return {
      socialMediaProviders: [
        {
          name: 'Apple',
          logo: 'IconApple'
        },
        {
          name: 'Facebook',
          logo: 'IconFacebook'
        },
        {
          name: 'Google',
          logo: 'IconGoogle'
        }
      ]
    };
  },
  computed: {
    ...mapGetters('auth', ['oauthUrlGet']),
    getPanelRedirectorPath() {
      return this.$router.resolve({
        name: 'PanelRedirector'
      }).href;
    },
    signupReturnUrl() {
      return `${window.location.origin}${this.getPanelRedirectorPath}?signup=1`;
    },
    loginReturnUrl() {
      return `${window.location.href}`;
    }
  },
  methods: {
    ...mapMutations('auth', ['updateProvider', 'updateReturnUrl']),
    async openAuthentication(provider) {
      await this.updateProvider(provider);
      await this.updateReturnUrl(this.signupReturnUrl);
      window.location.assign(this.oauthUrlGet);
    }
  }
};
</script>
