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
        @clicked="oauth(name)"
      >
        <template #start>
          <!-- icon -->
          <component
            :is="logo"
            class="fill-current text-on-secondary text-opacity-high"
          />
        </template>
      </Button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import Button from '@/components/inputs/Button.vue';
import IconGoogle from '@/assets/icons/google.svg';
// import IconFacebook from '@/assets/icons/facebook.svg';

export default {
  name: 'LinkAccount',
  components: {
    Button
  },
  data() {
    return {
      socialMediaProviders: [
        /*
        {
          name: 'Facebook',
          logo: facebookLogo
        },
        */
        {
          name: 'Google',
          logo: IconGoogle
        }
      ]
    };
  },
  computed: {
    ...mapGetters('auth', {
      oauthLink: 'oauth'
    })
  },
  methods: {
    ...mapMutations('auth', ['updateProvider', 'updateReturnUrl']),
    async oauth(provider) {
      await this.updateProvider(provider);
      const returnURL = `${window.location.href}?signUpStarted=true`;
      await this.updateReturnUrl(returnURL);
      const redirectUrl = await this.oauthLink;
      window.location.assign(redirectUrl);
    }
  }
};
</script>
