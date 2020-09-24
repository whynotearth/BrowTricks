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
      <form
        @submit.prevent="submit"
        class="flex flex-col w-full max-w-sm flex-grow justify-between"
      >
        <div class="">
          <MaterialInput
            v-model="$v.firstName.$model"
            label="First Name"
            :error="$v.firstName.$error"
          >
            <p v-if="!$v.firstName.required">
              First Name is required
            </p>
          </MaterialInput>
          <MaterialInput
            v-model="$v.lastName.$model"
            label="Last Name"
            :error="$v.lastName.$error"
          >
            <p v-if="!$v.lastName.required">
              Last Name is required
            </p>
          </MaterialInput>
          <MaterialInput
            v-model="$v.email.$model"
            label="Email Address"
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
            v-model="$v.password.$model"
            label="Password"
            :error="$v.password.$error"
          >
            <p v-if="!$v.password.required">
              Password is required
            </p>
          </MaterialInput>
        </div>
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
import { required, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { showOverlayAndRedirect } from '@/helpers';

export default {
  name: 'AuthSignup',
  components: {
    MaterialInput
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
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
    password: {
      required
    }
  },
  methods: {
    ...mapActions('auth', ['register']),
    submit() {
      this.register({
        params: {
          body: {
            password: this.password,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName
          }
        }
      })
        .then(this.onSuccess)
        .catch(error => {
          console.log(error, error.response);
        });
    },
    onSuccess() {
      showOverlayAndRedirect({
        title: 'Success!',
        route: { name: 'TenantHome' }
      });
    }
  }
};
</script>
