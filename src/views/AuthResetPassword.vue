<template>
  <div
    class="flex flex-col items-center w-full text-left min-h-vh100--without-header"
  >
    <div v-if="!invalidPage" class="max-w-md px-4 py-10">
      <p class="tg-body-mobile text-opacity-high">
        Your new password must be different from a previously used password.
      </p>
    </div>
    <div
      class="flex flex-col items-center flex-grow w-full px-4 py-8 bg-surface rounded-t-xl"
    >
      <form
        v-if="!invalidPage"
        @submit.prevent="submit"
        novalidate
        class="flex flex-col justify-between flex-grow w-full max-w-sm"
      >
        <div class="">
          <MaterialInput
            type="password"
            v-model.trim="$v.password.$model"
            label="New Password"
            :attrs="{ autocomplete: 'new-password' }"
            :validatorModel="$v.password"
            :serverErrors="serverErrors.Password"
          >
            <p v-if="!$v.password.required">
              Password is required
            </p>
          </MaterialInput>

          <MaterialInput
            type="password"
            v-model.trim="$v.confirmPassword.$model"
            label="Repeat Password"
            :attrs="{ autocomplete: 'new-password' }"
            :validatorModel="$v.confirmPassword"
            :serverErrors="serverErrors.ConfirmPassword"
          >
            <p v-if="!$v.confirmPassword.required">
              Confirm Password is required
            </p>
            <p v-else-if="!$v.confirmPassword.sameAs">
              Confirm password should be equal to password
            </p>
          </MaterialInput>

          <p v-if="errorMessage" class="mb-4 text-error tg-body-mobile">
            {{ errorMessage }}
          </p>
        </div>

        <div>
          <Button class="mb-6" type="submit" title="Submit" />
          <p class="mt-4 text-center tg-body-mobile">
            <router-link :to="{ name: 'AuthLogin' }" class="text-primary-blue">
              Back to login
            </router-link>
          </p>
        </div>
      </form>

      <div v-else>
        <p class="mb-4 text-error tg-body-mobile">
          Sorry, This page is not valid. Please check the link and try again.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import formGeneralUtils from '@/mixins/formGeneralUtils.js';
import { mapActions } from 'vuex';
import { required, sameAs } from 'vuelidate/lib/validators';
import { showOverlayAndRedirect } from '@/helpers';
// todo: use validationPassword

export default {
  name: 'AuthResetPassword',
  // NOTE: we use a mixin
  mixins: [formGeneralUtils],
  components: {
    MaterialInput
  },
  data() {
    return {
      invalidPage: false,
      password: '',
      confirmPassword: ''
    };
  },
  validations: {
    password: {
      required
    },
    confirmPassword: {
      sameAsPassword: sameAs('password'),
      required
    }
  },
  created() {
    if (!this.userName || !this.token || !this.email) {
      this.invalidPage = true;
    }
  },
  computed: {
    userName() {
      return this.$route.query.username;
    },
    token() {
      return this.$route.query.token;
    },
    email() {
      return this.$route.email;
    }
  },
  methods: {
    ...mapActions('auth', ['resetPassword']),
    submit() {
      if (!this.beforeSubmit()) {
        return;
      }

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.resetPassword({
        params: {
          body: {
            userName: this.userName,
            token: this.token,
            password: this.password,
            confirmPassword: this.confirmPassword
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
