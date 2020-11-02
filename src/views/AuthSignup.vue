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
      <AuthButtons></AuthButtons>

      <div class="flex items-center justify-center w-full py-8">
        <hr class="flex-grow" />
        <span class="px-1">OR</span>
        <hr class="flex-grow" />
      </div>

      <form
        @submit.prevent="submit"
        novalidate
        class="flex flex-col justify-between flex-grow w-full max-w-sm"
      >
        <div class="">
          <MaterialInput
            v-model.trim="$v.firstName.$model"
            label="First Name"
            :attrs="{
              autocomplete: 'first-name',
              name: 'firstname',
              enterkeyhint: 'send'
            }"
            :validatorModel="$v.firstName"
            :serverErrors="serverErrors.FirstName"
          >
            <p v-if="!$v.firstName.required">
              First Name is required
            </p>
          </MaterialInput>
          <MaterialInput
            v-model.trim="$v.lastName.$model"
            label="Last Name"
            :attrs="{
              autocomplete: 'family-name',
              name: 'lastname',
              enterkeyhint: 'send'
            }"
            :validatorModel="$v.lastName"
            :serverErrors="serverErrors.LastName"
          >
            <p v-if="!$v.lastName.required">
              Last Name is required
            </p>
          </MaterialInput>

          <PhoneInput
            v-model="$v.phoneNumber.$model"
            :validatorModel="$v.phoneNumber"
            :serverErrors="serverErrors.PhoneNumber"
          >
            <p v-if="!$v.phoneNumber.required">
              Mobile number is required
            </p>
            <p v-else-if="!$v.phoneNumber.isPhoneNumberValid">
              Enter a valid mobile number please
            </p>
          </PhoneInput>

          <MaterialInput
            type="email"
            v-model.trim="$v.email.$model"
            label="Email Address"
            :attrs="{
              autocomplete: 'email',
              inputmode: 'email',
              name: 'email',
              enterkeyhint: 'send'
            }"
            :validatorModel="$v.email"
            :serverErrors="serverErrors.Email"
          >
            <p v-if="!$v.email.required">
              Email is required
            </p>
            <p v-else-if="!$v.email.email">
              Please enter an email address
            </p>
          </MaterialInput>

          <MaterialInput
            v-model.trim="$v.userName.$model"
            label="Username"
            :validatorModel="$v.userName"
            :serverErrors="serverErrors.UserName"
          >
            <p v-if="!$v.userName.required">
              Username is required
            </p>
            <p v-else-if="!$v.userName.minLength">
              It should have at least
              {{ $v.userName.$params.minLength.min }} characters
            </p>
            <p v-else-if="!$v.userName.maxLength">
              It should have maximum
              {{ $v.userName.$params.maxLength.max }} characters
            </p>
            <p v-else-if="!$v.userName.isValidUsername">
              Username can only contain English characters, digits and
              underscore
            </p>
          </MaterialInput>

          <MaterialInput
            type="password"
            v-model.trim="$v.password.$model"
            label="Password"
            :attrs="{ autocomplete: 'new-password', enterkeyhint: 'send' }"
            :validatorModel="$v.password"
            :serverErrors="serverErrors.Password"
          >
            <p v-if="!$v.password.required">
              Password is required
            </p>
          </MaterialInput>
          <MaterialInput
            type="password"
            v-model.trim="$v.repeatPassword.$model"
            label="Confirm Password"
            :attrs="{ autocomplete: 'new-password', enterkeyhint: 'send' }"
            :validatorModel="$v.repeatPassword"
          >
            <p v-if="!$v.password.required">
              Password is required
            </p>
            <p class="error" v-else-if="!$v.repeatPassword.sameAsPassword">
              Passwords must match.
            </p>
          </MaterialInput>
        </div>

        <p v-if="errorMessage" class="mb-4 text-error tg-body-mobile">
          {{ errorMessage }}
        </p>

        <div>
          <Button type="submit" title="Let's Get Started" />
          <p class="mt-4 text-center tg-body-mobile">
            Already have an account?
            <router-link :to="{ name: 'AuthLogin' }" class="text-primary-blue">
              Login
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import PhoneInput from '@/components/inputs/PhoneInput.vue';
import { isValidUsername } from '@/helpers.js';
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs
} from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import {
  showOverlayAndRedirect,
  isPhoneNumberValid
  // getFormattedMetaTitle
} from '@/helpers';
import formGeneralUtils from '@/mixins/formGeneralUtils.js';
import AuthButtons from '@/components/auth/AuthButtons';

export default {
  name: 'AuthSignup',
  // NOTE: we use a mixin
  mixins: [formGeneralUtils],
  components: {
    PhoneInput,
    AuthButtons,
    MaterialInput
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      phoneNumber: '',
      repeatPassword: ''
    };
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    email: {
      required,
      email
    },
    userName: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(40),
      isValidUsername
    },
    password: {
      required
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    phoneNumber: {
      required,
      isPhoneNumberValid
    }
  },
  methods: {
    ...mapActions('auth', ['register']),
    submit() {
      if (!this.beforeSubmit()) {
        return;
      }

      this.register({
        params: {
          body: {
            password: this.password,
            email: this.email,
            userName: this.userName,
            firstName: this.firstName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber
          }
        }
      })
        .then(this.onSuccess)
        .catch(this.onSubmitCatch);
    },
    onSuccess() {
      this.$gtm.trackEvent({
        event: 'gaEvent',
        category: 'Accounts',
        action: 'Register'
      });

      showOverlayAndRedirect({
        title: 'Success!',
        route: { name: 'PanelRedirector' }
      });
    }
  }
};
</script>
