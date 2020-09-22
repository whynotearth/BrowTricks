<template>
  <div>
    <div
      class="py-3"
      v-for="({ name, logo }, index) in socialMediaProviders"
      :key="index"
    >
      <Button
        textJustify="justify-between"
        :title="`${mode === 'signup' ? 'Sign Up' : 'Log In'} With ${name}`"
        class="tg-color-label-mobile text-white text-opacity-high rounded-full py-3 md:px-5"
        @clicked="openAuthentication(name)"
      >
        <template #start>
          <!-- icon -->
          <component
            :is="logo"
            class="fill-current text-on-secondary text-opacity-high"
          />
        </template>
        <template #end><i></i></template>
      </Button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

import IconGoogle from '@/assets/icons/google.svg';
import IconFacebook from '@/assets/icons/facebook.svg';

export default {
  name: 'AuthButtons',
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
          name: 'Facebook',
          logo: IconFacebook
        },
        {
          name: 'Google',
          logo: IconGoogle
        }
      ]
    };
  },
  computed: {
    ...mapGetters('auth', ['oauthUrlGet']),
    myAccountEmptyPath() {
      return this.$router.resolve({
        name: 'MyAccountEmpty'
      }).href;
    },
    signupReturnUrl() {
      return `${window.location.origin}${this.myAccountEmptyPath}?signup=1`;
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
