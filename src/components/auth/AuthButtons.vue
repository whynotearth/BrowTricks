<template>
  <div>
    <div
      class="py-3"
      v-for="({ name, logo }, index) in socialMediaProviders"
      :key="index"
    >
      <Button :title="`${name}`" @clicked="openAuthentication(name)">
        <template #start>
          <!-- icon -->
          <component
            :is="logo"
            class="fill-current text-on-secondary text-opacity-high"
          />
        </template>
        <template #end><em></em></template>
      </Button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
const { cordova } = window;

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
          name: 'Facebook'
        },
        {
          name: 'Google'
        },
        {
          name: 'Apple'
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

      if (process.env.VUE_APP_MOBILE && cordova) {
        // When we run the App in mobile, then
        // we will open the authentication page inside
        // the mobile app.
        const browser = cordova.InAppBrowser.open(
          this.oauthUrlGet,
          '_blank',
          'location=yes'
        );

        // We will listen to load start page and find
        // whether the query string has token in it.
        browser.addEventListener(
          'loadstart',
          function(event) {
            const currentURL = new URL(event.url);
            const token = currentURL.searchParams.get('token');

            // If we find a token then we assume the authentication
            // process is completed.
            if (token != null) {
              const redirectURL = this.signupReturnUrl + '&token=' + token;

              // Manually redirect to wait page to store the token
              // and proceed further
              window.location.assign(redirectURL);

              // Close the browser we have opened.
              browser.close();
            }
          }.bind(this)
        );
      } else {
        window.location.assign(this.oauthUrlGet);
      }
    }
  }
};
</script>
