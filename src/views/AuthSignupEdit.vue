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
import PhoneInput from '@/components/inputs/PhoneInput.vue';
import { isValidUsername } from '@/helpers.js';
import {
  required,
  email,
  minLength,
  maxLength
} from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { showOverlayAndRedirect, isPhoneNumberValid } from '@/helpers';
import formGeneralUtils from '@/mixins/formGeneralUtils.js';
import { get } from 'lodash-es';

export default {
  name: 'AuthSignupEdit',
  // NOTE: we use a mixin
  mixins: [formGeneralUtils],
  components: {
    MaterialInput,
    PhoneInput
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
      minLength: minLength(4),
      maxLength: maxLength(40),
      isValidUsername
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
          this.userName = get(this.profile, 'userName', '')
            .split('@')[0]
            .replace(/[^a-zA-Z0-9_]/g, '');
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
