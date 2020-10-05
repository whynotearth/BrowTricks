<template>
  <div
    class="min-h-vh100--without-header flex flex-col items-center text-left w-full"
  >
    <div class="px-4 max-w-md py-10">
      <p class="tg-body-mobile text-opacity-high">
        Enter your registrated username to receive password reset instruction.
      </p>
    </div>
    <div
      class="flex-grow w-full bg-surface rounded-t-xl px-4 py-8 flex flex-col items-center"
    >
      <form
        @submit.prevent="submit"
        novalidate
        class="flex flex-col w-full max-w-sm flex-grow justify-between"
      >
        <div class="">
          <MaterialInput
            v-model.trim="$v.userName.$model"
            label="Username"
            :attrs="{
              autocomplete: 'username',
              enterkeyhint: 'send',
              name: 'username'
            }"
            :validatorModel="$v.userName"
            :serverErrors="serverErrors.UserName"
          >
            <p v-if="!$v.userName.required">
              Username is required
            </p>
            <p v-if="!$v.userName.minLength">
              Should be at least 5 characters
            </p>
            <p v-else-if="!$v.userName.alphaNum">
              Should be alphanumeric
            </p>
          </MaterialInput>

          <p v-if="errorMessage" class="mb-4 text-error tg-body-mobile">
            {{ errorMessage }}
          </p>
        </div>

        <div>
          <Button class="mb-6" type="submit" title="Reset Password" />
          <p class="mt-4 tg-body-mobile text-center">
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
import { required, minLength, alphaNum } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { showOverlayAndRedirect } from '@/helpers';

export default {
  name: 'AuthForgotPassword',
  // NOTE: we use a mixin
  mixins: [formGeneralUtils],
  components: {
    MaterialInput
  },
  data() {
    return {
      userName: ''
    };
  },
  validations: {
    // email: {
    //   required,
    //   email
    // },
    userName: {
      required,
      alphaNum,
      minLength: minLength(5)
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
            userName: this.userName
          }
        }
      })
        .then(this.onSuccess)
        .catch(this.onSubmitCatch);
    },
    onSuccess() {
      showOverlayAndRedirect({
        title: 'Success!',
        route: { name: 'Home' }
      });
    }
  }
};
</script>
