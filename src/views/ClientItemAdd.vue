<template>
  <PageContentBoard>
    <div class="flex flex-col items-center text-left w-full">
      <div
        class="flex-grow w-full bg-surface rounded-t-xl px-4 py-8 flex flex-col items-center"
      >
        <form
          @submit.prevent="submit"
          novalidate
          class="flex flex-col w-full max-w-sm flex-grow justify-between"
        >
          <h2 class="tg-h3-mobile text-on-background text-opacity-high mb-4">
            Enter Client Info
          </h2>
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
          </div>

          <p v-if="errorMessage" class="mb-4 text-error tg-body-mobile">
            {{ errorMessage }}
          </p>

          <div>
            <Button type="submit" title="Create" />
          </div>
        </form>
      </div>
    </div>
  </PageContentBoard>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { isPhoneNumberValid, showOverlayAndRedirect } from '@/helpers';
import formGeneralUtils from '@/mixins/formGeneralUtils.js';
import PhoneInput from '@/components/inputs/PhoneInput.vue';

export default {
  name: 'ClientItemAdd',
  // NOTE: we use a mixin
  mixins: [formGeneralUtils],
  components: { PhoneInput },
  props: ['tenantSlug'],
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
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
    phoneNumber: {
      required,
      isPhoneNumberValid
    },
    email: {
      required,
      email
    }
  },
  methods: {
    ...mapActions('client', ['createClient']),
    submit() {
      if (!this.beforeSubmit()) {
        return;
      }

      this.createClient({
        params: {
          tenantSlug: this.tenantSlug,
          body: {
            firstName: this.firstName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber,
            email: this.email
          }
        }
      })
        .then(this.onSuccess)
        .catch(this.onSubmitCatch);
    },
    onSuccess() {
      showOverlayAndRedirect({
        title: 'Success!',
        route: {
          name: 'ClientList'
        }
      });
    }
  }
};
</script>
