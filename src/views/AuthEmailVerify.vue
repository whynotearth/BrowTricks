<template>
  <div class="min-h-vh100--without-header px-4">
    <div
      class="flex flex-col items-center justify-around py-4 min-h-vh100--without-header max-w-md mx-auto"
    >
      <p>
        An email has been sent to
        <span class="font-bold">{{ $route.query.email }}</span
        >.<br />Please check your email and follow the verification instructions
        to continue.
      </p>
      <div class="max-w-sm">
        <img
          class="my-6 select-none"
          src="https://res.cloudinary.com/whynotearth/image/upload/v1601899012/BrowTricks/static_v2/auth-forgot-step2_md5jqb.png"
        />
      </div>

      <div>
        <Button class="mb-4" title="Go Home" :to="{ name: 'Home' }" />
        <Button
          title="Edit Your Email"
          :background="null"
          :to="{ name: 'AuthSignupEdit' }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'AuthEmailVerify',
  data() {
    return {
      profile: null
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions('loading', ['loadingUpdate']),
    ...mapActions('auth', ['requestVerifyEmail']),
    ...mapActions('profile', ['profileFetch']),
    async init() {
      await this._profileFetch();
      if (!this.profile) {
        alert('Something went wrong.');
        return;
      }

      if (this.profile.isEmailConfirmed) {
        this.goPanelRedirector();
        return;
      }

      if (!this.profile.email) {
        this.goSignupEdit();
        return;
      }

      this.loadingUpdate(true);
      await this._requestVerifyEmail();
      this.loadingUpdate(false);
    },

    async _profileFetch() {
      this.loadingUpdate(true);
      await this.profileFetch()
        .then(response => {
          this.profile = response;
        })
        .catch(() => {
          console.log('Error in get profile');
        });
      this.loadingUpdate(false);
    },

    _requestVerifyEmail() {
      const path = this.$router.resolve({
        name: 'AuthEmailSubmitVerify'
      }).href;
      const callbackUrl = `${window.location.origin}${path}`;

      return this.requestVerifyEmail({
        params: {
          body: {
            companySlug: process.env.VUE_APP_COMPANY_SLUG,
            returnUrl: callbackUrl
          }
        }
      })
        .then(() => {
          console.log('Code sent');
        })
        .catch(this.onSubmitCatch);
    },
    goPanelRedirector() {
      this.$router.replace({ name: 'PanelRedirector' });
    },
    goSignupEdit() {
      this.$router.replace({ name: 'AuthSignupEdit' });
    }
  }
};
</script>
