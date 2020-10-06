<template>
  <div
    class="flex flex-col items-center w-full text-left min-h-vh100--without-header"
  >
    <div class="max-w-md px-4">
      <img
        src="https://res.cloudinary.com/whynotearth/image/upload/v1600874347/BrowTricks/static_v2/image-login_crwfva.png"
        alt=""
      />
    </div>
    <div
      class="flex flex-col items-center flex-grow w-full px-4 py-8 bg-surface rounded-t-xl"
    >
      <!-- <AuthButtons></AuthButtons>

      <div class="flex items-center justify-center w-full py-8">
        <hr class="flex-grow" />
        <span class="px-1">OR</span>
        <hr class="flex-grow" />
      </div> -->

      <form
        @submit.prevent="submit"
        novalidate
        class="flex flex-col justify-between flex-grow w-full max-w-sm"
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
            label="Username/Email"
            :attrs="{ autocomplete: 'username', enterkeyhint: 'send' }"
            :validatorModel="$v.userName"
            :serverErrors="serverErrors.UserName"
          >
            <p v-if="!$v.userName.required">
              This field is required
            </p>
          </MaterialInput>

          <MaterialInput
            type="password"
            v-model.trim="$v.password.$model"
            label="Password"
            :attrs="{ autocomplete: 'current-password', enterkeyhint: 'send' }"
            :validatorModel="$v.password"
            :serverErrors="serverErrors.Password"
          >
            <p v-if="!$v.password.required">
              Password is required
            </p>
          </MaterialInput>

          <p v-if="errorMessage" class="mb-4 text-error tg-body-mobile">
            {{ errorMessage }}
          </p>
        </div>

        <div>
          <Button class="mb-6" type="submit" title="Login" />
          <p class="mt-4 text-center tg-body-mobile">
            Don't have an account?
            <router-link :to="{ name: 'AuthSignup' }" class="text-primary-blue">
              Sign Up
            </router-link>
          </p>

          <p class="mt-4 text-center tg-body-mobile">
            <router-link
              :to="{ name: 'AuthForgotPassword' }"
              class="text-primary-blue"
            >
              Forgot password?
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MaterialInput from '@/components/inputs/MaterialInput.vue';
// import AuthButtons from '@/components/auth/AuthButtons';
import formGeneralUtils from '@/mixins/formGeneralUtils.js';
import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { showOverlayAndRedirect } from '@/helpers';

export default {
  name: 'AuthLogin',
  // NOTE: we use a mixin
  mixins: [formGeneralUtils],
  components: {
    // AuthButtons,
    MaterialInput
  },
  data() {
    return {
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
      required
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

      let body = {
        password: this.password
      };

      if (this.validateEmail(this.userName)) {
        body.email = this.userName;
      } else {
        body.userName = this.userName;
      }
      this.loginStandard({
        params: {
          body
        }
      })
        .then(this.onSuccess)
        .catch(this.onSubmitCatch);
    },
    onSuccess() {
      showOverlayAndRedirect({
        title: 'Success!',
        route: { name: 'PanelRedirector' }
      });
    },
    validateEmail(mail) {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
        ? true
        : false;
    }
  }
};
</script>
