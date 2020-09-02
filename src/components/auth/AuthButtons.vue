<template>
  <div>
    <div
      class="py-3"
      v-for="({ name, logo }, index) in socialMediaProviders"
      :key="index"
    >
      <Button
        textJustify="justify-between"
        :title="`Log In With ${name}`"
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
import Button from '@/components/inputs/Button.vue';
import IconGoogle from '@/assets/icons/google.svg';
import IconFacebook from '@/assets/icons/facebook.svg';

export default {
  name: 'LinkAccount',
  components: {
    Button
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
    signupReturnUrl() {
      const path = this.$router.resolve({
        name: 'SignUp',
        params: { step: 'business-info' }
      }).href;
      return `${window.location.origin}${path}?emailVerified=1`;
    },
    loginReturnUrl() {
      return `${window.location.href}?emailVerified=1`;
    }
  },
  methods: {
    ...mapMutations('auth', ['updateProvider', 'updateReturnUrl']),
    async openAuthentication(provider) {
      await this.updateProvider(provider);

      await this.updateReturnUrl(this.loginReturnUrl);
      console.log('this.oauth', this.oauthUrlGet);
      window.location.assign(this.oauth);
    }
  }
};
</script>
