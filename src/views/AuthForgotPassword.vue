<template>
  <div
    class="flex flex-col items-center w-full text-left min-h-vh100--without-header"
  >
    <div class="max-w-md px-4 py-10">
      <p class="tg-body-mobile text-opacity-high">
        Enter your registered email address to receive password reset
        instructions.
      </p>
    </div>
    <div
      class="flex flex-col items-center flex-grow w-full px-4 py-8 bg-surface rounded-t-xl"
    >
      <form
        @submit.prevent="submit"
        novalidate
        class="flex flex-col justify-between flex-grow w-full max-w-sm"
      >
        <div class="">
          <MaterialInput
            v-model.trim="$v.email.$model"
            label="Email"
            type="email"
            :attrs="{
              autocomplete: 'email',
              enterkeyhint: 'send'
            }"
            :validatorModel="$v.email"
            :serverErrors="serverErrors.Email"
          >
            <p v-if="!$v.email.required">
              Email is required
            </p>
            <p v-else-if="!$v.email.email">
              Should be a vaild email
            </p>
          </MaterialInput>

          <p v-if="errorMessage" class="mb-4 text-error tg-body-mobile">
            {{ errorMessage }}
          </p>
        </div>

        <div>
          <Button class="mb-6" type="submit" title="Reset Password" />
          <p class="mt-4 text-center tg-body-mobile">
            <router-link :to="{ name: 'AuthLogin' }" class="text-primary-blue">
              Back to login
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import formGeneralUtils from '@/mixins/formGeneralUtils.js';
import { required, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
// import { showOverlayAndRedirect } from '@/helpers';

export default {
  name: 'AuthForgotPassword',
  // NOTE: we use a mixin
  mixins: [formGeneralUtils],
  components: {
    MaterialInput
  },
  data() {
    return {
      email: ''
    };
  },
  validations: {
    email: {
      required,
      email
    }
  },
  computed: {
    getResetPasswordPath() {
      return this.$router.resolve({
        name: 'AuthResetPassword'
      }).href;
    },
    resetPasswordReturnUrl() {
      return `${window.location.origin}${this.getResetPasswordPath}`;
    }
  },
  methods: {
    ...mapActions('auth', ['forgotPassword']),
    submit() {
      if (!this.beforeSubmit()) {
        return;
      }

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.forgotPassword({
        params: {
          body: {
            companySlug: process.env.VUE_APP_COMPANY_SLUG,
            returnUrl: this.resetPasswordReturnUrl,
            email: this.email
          }
        }
      })
        .then(this.onSuccess)
        .catch(this.onSubmitCatch);
    },
    onSuccess() {
      this.$router.push({
        name: 'AuthSentEmailSuccess',
        query: { email: this.email }
      });
    }
  }
};
</script>
