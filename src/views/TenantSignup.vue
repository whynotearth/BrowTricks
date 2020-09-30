<template>
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
          Write your tenant information
        </h2>
        <div class="">
          <MaterialInput
            v-model.trim="$v.name.$model"
            label="Name"
            :attrs="{ autocomplete: 'first-name' }"
            :validatorModel="$v.name"
            :serverErrors="serverErrors.Name"
          >
            <p v-if="!$v.name.required">
              Name is required
            </p>
          </MaterialInput>

          <MaterialInput
            v-model.trim="$v.phoneNumber.$model"
            label="Phone Number"
            type="tel"
            :attrs="{ autocomplete: 'tel', inputmode: 'tel' }"
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

          <TextAreaInput v-model="$v.description.$model" label="Description" />
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
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { isPhoneNumberValid, showOverlayAndRedirect } from '@/helpers';
import formGeneralUtils from '@/mixins/formGeneralUtils.js';

export default {
  name: 'TenantSignup',
  // NOTE: we use a mixin
  mixins: [formGeneralUtils],
  data() {
    return {
      name: '',
      phoneNumber: '',
      description: ''
    };
  },
  validations: {
    name: {
      required
    },
    phoneNumber: {
      required,
      isPhoneNumberValid
    },
    description: {}
  },
  methods: {
    ...mapActions('tenant', ['createTenant']),
    submit() {
      if (!this.beforeSubmit()) {
        return;
      }

      this.createTenant({
        params: {
          body: {
            name: this.name,
            phone: this.phoneNumber,
            description: this.description
          }
        }
      })
        .then(this.onSuccess)
        .catch(this.onSubmitCatch);
    },
    onSuccess(response) {
      console.log('response', response);
      showOverlayAndRedirect({
        title: 'Success!',
        route: {
          name: 'FormTemplatesListEmpty',
          params: { tenantSlug: this.tenantSlug }
        }
      });
    }
  }
};
</script>
