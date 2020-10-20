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
            <p v-if="!$v.userName.minLength">
              Should be at least 5 characters
            </p>
            <p v-else-if="!$v.userName.alphaNum">
              Should be alphanumeric
            </p>
          </MaterialInput>
        </div>

        <p v-if="errorMessage" class="mb-4 text-error tg-body-mobile">
          {{ errorMessage }}
        </p>

        <div>
          <Button class="mb-4" type="submit" title="Save" />
          <Button
            title="Logout"
            :background="null"
            :to="{ name: 'AuthLogout' }"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import { required, email, minLength, alphaNum } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { showOverlayAndRedirect, isPhoneNumberValid } from '@/helpers';
import formGeneralUtils from '@/mixins/formGeneralUtils.js';
import { get } from 'lodash-es';

export default {
  name: 'AuthSignupEdit',
  // NOTE: we use a mixin
  mixins: [formGeneralUtils],
  components: {
    MaterialInput
  },
  data() {
    return {
      profile: null,

      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      userName: ''
    };
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    phoneNumber: {
      required,
      isPhoneNumberValid
    },
    email: {
      required,
      email
    },
    userName: {
      required,
      alphaNum,
      minLength: minLength(5)
    }
  },
  created() {
    this._profileFetch();
  },
  methods: {
    ...mapActions('auth', ['register']),
    ...mapActions('profile', ['profileFetch', 'profileUpdate']),
    async _profileFetch() {
      this.loadingUpdate(true);
      await this.profileFetch()
        .then(profile => {
          this.profile = profile;

          this.phoneNumber = this.profile.phoneNumber;
          this.firstName = this.profile.firstName;
          this.lastName = this.profile.lastName;
          this.email = this.profile.email;
          this.userName = get(this.profile, 'userName', '').split('@')[0];
          // this.userName = this.profile.userName;
        })
        .catch(() => {
          console.log('Error in get profile');
        });
      this.loadingUpdate(false);
    },
    submit() {
      if (!this.beforeSubmit()) {
        return;
      }

      this.profileUpdate({
        params: {
          body: {
            firstName: this.firstName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber,
            email: this.email,
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
        route: { name: 'PanelRedirector' }
      });
    }
  }
};
</script>
