<template>
  <div class="flex flex-col items-center text-left w-full">
    <div class="px-4">
      <img
        class="max-w-md"
        src="https://res.cloudinary.com/whynotearth/image/upload/v1600874347/BrowTricks/static_v2/image-login_crwfva.png"
        alt=""
      />
    </div>
    <div
      class="flex flex-col items-center justify-start flex-1 w-full bg-surface rounded-xl p-4"
    >
      <div class="w-full max-w-sm">
        <MaterialInput
          type="tel"
          label="Phone Number"
          pattern='pattern="[0-9]*'
          v-model="$v.phoneNumber.$model"
          :error="
            $v.phoneNumber.$dirty &&
              (!$v.phoneNumber.required || !$v.phoneNumber.minLength)
          "
        >
          <span
            v-if="$v.phoneNumber.$dirty && !$v.phoneNumber.required"
            class="text-xs text-red-600"
          >
            Phone number is required
          </span>
          <span v-if="!$v.phoneNumber.minLength" class="text-xs text-red-600">
            Please enter a valid phone number
          </span>
        </MaterialInput>
      </div>
      <div>
        <Button
          title="Request OTP"
          padding="px-4 py-3"
          v-on:clicked="requestOtp"
        />
        <p class="mt-4 tg-body-mobile">
          Don't have an account?
          <router-link :to="{ name: 'SignUp' }" class="text-primary-blue">
            Sign Up
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import Button from '@/components/inputs/Button.vue';

import router from '@/router';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'AuthLogin',
  components: {
    Button,
    MaterialInput
  },
  data() {
    return {
      phoneNumber: ''
    };
  },
  validations: {
    phoneNumber: {
      required,
      minLength: minLength(7)
    }
  },
  methods: {
    requestOtp() {
      router.push({ name: 'Verification' });
    }
  }
};
</script>
