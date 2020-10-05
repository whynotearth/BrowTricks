<template>
  <div
    class="min-h-vh100--without-header flex flex-col items-center text-left w-full"
  >
    <div class="px-4 max-w-md">
      <img
        src="https://res.cloudinary.com/whynotearth/image/upload/v1600874347/BrowTricks/static_v2/image-login_crwfva.png"
        alt=""
      />
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
              autocomplete: 'last-name',
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
          <MaterialInput
            v-model.trim="$v.phoneNumber.$model"
            label="Phone Number"
            type="tel"
            :attrs="{
              autocomplete: 'tel',
              inputmode: 'tel',
              name: 'telephone',
              enterkeyhint: 'send'
            }"
            :validatorModel="$v.phoneNumber"
            :serverErrors="serverErrors.PhoneNumber"
          >
            <p v-if="!$v.phoneNumber.required">
              Phone number is required
            </p>
            <p v-else-if="!$v.phoneNumber.isPhoneNumberValid">
              Please enter a valid phone number
            </p>
          </MaterialInput>
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
            :attrs="{
              autocomplete: 'family-name',
              name: 'username',
              enterkeyhint: 'send'
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
        </div>

        <p v-if="errorMessage" class="mb-4 text-error tg-body-mobile">
          {{ errorMessage }}
        </p>

        <div>
          <Button type="submit" title="Let's Get Started" />
          <p class="mt-4 tg-body-mobile text-center">
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
import { required, alphaNum, minLength } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import { showOverlayAndRedirect, isPhoneNumberValid } from '@/helpers';
import formGeneralUtils from '@/mixins/formGeneralUtils.js';

export default {
  name: 'AuthSignup',
  // NOTE: we use a mixin
  mixins: [formGeneralUtils],
  components: {
    MaterialInput
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      // email: '',
      userName: '',
      password: '',
      phoneNumber: ''
    };
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
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
    },
    phoneNumber: {
      required,
      isPhoneNumberValid
    }
  },
  created() {
    if (this.isAuthenticated && !this.isPhoneNumberConfirmedGet) {
      this.goAccountEdit();
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'isPhoneNumberConfirmedGet'])
  },
  methods: {
    ...mapActions('auth', ['register']),
    goAccountEdit() {
      this.$router.push({ name: 'AuthSignupEdit' });
    },
    submit() {
      if (!this.beforeSubmit()) {
        return;
      }

      this.register({
        params: {
          body: {
            password: this.password,
            // email: this.email,
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
      showOverlayAndRedirect({
        title: 'Success!',
        route: { name: 'AuthNumberVerify' }
      });
    }
  }
};
</script>
