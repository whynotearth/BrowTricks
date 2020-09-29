<template>
  <div class="flex flex-col items-center text-left w-full">
    <div class="px-4 max-w-md">
      <img
        src="https://res.cloudinary.com/whynotearth/image/upload/v1600874347/BrowTricks/static_v2/image-login_crwfva.png"
        alt=""
      />
    </div>
    <div
      class="flex-grow w-full bg-surface rounded-t-xl px-4 py-8 flex flex-col items-center"
    >
      <AuthButtons></AuthButtons>

      <div class="w-full py-8 flex justify-center items-center">
        <hr class="flex-grow" />
        <span class="px-1">OR</span>
        <hr class="flex-grow" />
      </div>

      <form
        @submit.prevent="submit"
        class="flex flex-col w-full max-w-sm flex-grow justify-between"
      >
        <div class="">
          <MaterialInput
            type="email"
            v-model.trim="$v.email.$model"
            label="Email Address"
            :attrs="{ autocomplete: 'email', inputmode: 'email' }"
            :error="$v.email.$error"
          >
            <p v-if="!$v.email.required">
              Email is required
            </p>
            <p v-else-if="!$v.email.email">
              Please enter an email address
            </p>
          </MaterialInput>

          <MaterialInput
            type="password"
            v-model.trim="$v.password.$model"
            label="Password"
            :attrs="{ autocomplete: 'current-password' }"
            :error="$v.password.$error"
          >
            <p v-if="!$v.password.required">
              Password is required
            </p>
          </MaterialInput>
        </div>

        <p v-if="errorMessage" class="mb-4 text-error tg-body-mobile">
          {{ errorMessage }}
        </p>

        <div>
          <Button type="submit" title="Login" />
          <p class="mt-4 tg-body-mobile text-center">
            Don't have an account?
            <router-link :to="{ name: 'AuthSignup' }" class="text-primary-blue">
              Sign Up
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import AuthButtons from '@/components/auth/AuthButtons';
import { required, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { showOverlayAndRedirect } from '@/helpers';
import { get } from 'lodash-es';

export default {
  name: 'AuthLogin',
  components: {
    AuthButtons,
    MaterialInput
  },
  data() {
    return {
      errorMessage: '',
      email: '',
      password: ''
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  created() {
    this.clearError();
  },
  methods: {
    ...mapActions('auth', ['loginStandard']),
    clearError() {
      this.errorMessage = '';
    },
    submit() {
      this.clearError();

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.loginStandard({
        params: { body: { password: this.password, email: this.email } }
      })
        .then(this.onSuccess)
        .catch(error => {
          this.errorMessage = get(
            error,
            'response.data.error',
            'Something went wrong'
          );
          console.log(error, error.response);
        });
    },
    onSuccess() {
      // TODO: fetch tenants first or go to my account
      showOverlayAndRedirect({
        title: 'Success!',
        route: { name: 'PanelRedirector' }
      });
    }
  }
};
</script>
