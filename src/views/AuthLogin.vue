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
        novalidate
        class="flex flex-col w-full max-w-sm flex-grow justify-between"
      >
        <div class="">
          <!-- <MaterialInput
            type="email"
            v-model.trim="$v.email.$model"
            label="Email Address"
            :attrs="{ autocomplete: 'email', inputmode: 'email' }"
            :validatorModel="$v.email"
            :serverErrors="serverErrors.Email"
          >
            <p v-if="!$v.email.required">
              Email is required
            </p>
            <p v-else-if="!$v.email.email">
              Please enter an email address
            </p>
          </MaterialInput> -->

          <MaterialInput
            v-model.trim="$v.userName.$model"
            label="Username"
            :attrs="{ autocomplete: 'username' }"
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

          <MaterialInput
            type="password"
            v-model.trim="$v.password.$model"
            label="Password"
            :attrs="{ autocomplete: 'current-password' }"
            :validatorModel="$v.password"
            :serverErrors="serverErrors.Password"
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
import formGeneralUtils from '@/mixins/formGeneralUtils.js';
import { required, minLength, alphaNum } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { showOverlayAndRedirect } from '@/helpers';

export default {
  name: 'AuthLogin',
  // NOTE: we use a mixin
  mixins: [formGeneralUtils],
  components: {
    AuthButtons,
    MaterialInput
  },
  data() {
    return {
      serverErrors: {},
      errorMessage: '',
      // email: '',
      userName: '',
      password: ''
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
    },
    password: {
      required
    }
  },
  methods: {
    ...mapActions('auth', ['loginStandard']),
    submit() {
      if (!this.beforeSubmit()) {
        return;
      }

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.loginStandard({
        params: {
          body: {
            password: this.password,
            // email: this.email
            email: this.userName
          }
        }
      })
        .then(this.onSuccess)
        .catch(this.onSubmitCatch);
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
