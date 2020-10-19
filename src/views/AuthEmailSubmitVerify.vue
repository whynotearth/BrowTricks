<template>
  <div class="py-4">
    <p v-if="errorMessage" class="mb-4 text-error tg-body-mobile">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import { showOverlayAndRedirect } from '@/helpers';
import { mapActions } from 'vuex';
import { get } from 'lodash-es';

export default {
  name: 'AuthEmailSubmitVerify',
  data: () => ({
    errorMessage: ''
  }),
  created() {
    this.init();
  },
  methods: {
    ...mapActions('loading', ['loadingUpdate']),
    ...mapActions('auth', ['submitVerifyEmail']),
    async init() {
      const token = this.$route.query.email_confirm_token;
      if (!token) {
        alert('Url is invalid.');
        return;
      }

      this.loadingUpdate(true);
      await this.submit(token);
      this.loadingUpdate(false);
    },

    submit(token) {
      return this.submitVerifyEmail({
        params: { body: { token } }
      })
        .then(this.onSuccess)
        .catch(error => {
          console.log('error', error.response);

          const status = get(error, 'response.status', null);
          if (status === 401) {
            this.errorMessage = 'Please login before verifying your email.';
          } else {
            this.errorMessage = get(
              error,
              'response.data[0].description',
              'Something went wrong'
            );
          }
        });
    },
    onSuccess() {
      showOverlayAndRedirect({
        timeout: 2500,
        title: 'Success!',
        route: {
          name: 'PanelRedirector'
        },
        message: 'Your email verified'
      });
    }
  }
};
</script>
