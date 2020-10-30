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
          Enter your Business Info
        </h2>
        <div class="">
          <MaterialInput
            v-model.trim="$v.name.$model"
            label="Business Name"
            :attrs="{ autocomplete: 'first-name' }"
            :validatorModel="$v.name"
            :serverErrors="serverErrors.Name"
          >
            <p v-if="!$v.name.required">
              Name is required
            </p>
          </MaterialInput>

          <PhoneInput
            v-model="$v.phoneNumber.$model"
            label="Business Phone Number"
            :validatorModel="$v.phoneNumber"
            :serverErrors="serverErrors.PhoneNumber"
          >
            <p v-if="!$v.phoneNumber.required">
              Phone number is required
            </p>
            <p v-else-if="!$v.phoneNumber.isPhoneNumberValid">
              Enter a valid phone number please
            </p>
          </PhoneInput>

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
import PhoneInput from '@/components/inputs/PhoneInput';

export default {
  name: 'TenantSignup',
  // NOTE: we use a mixin
  mixins: [formGeneralUtils],
  components: { PhoneInput },
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
    ...mapActions('formTemplate', ['createDefaultTemplates']),
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
        .then(this._createDefaultTemplates)
        .then(this.onSuccess)
        .catch(this.onSubmitCatch);
    },
    async _createDefaultTemplates(tenantSlug) {
      return await this.createDefaultTemplates({
        params: {
          tenantSlug
        }
      })
        .then(() => {
          return tenantSlug;
        })
        .catch(() => {
          // todo: make a way to run it again
          console.log('Error in creating default PMU templates.');
          throw new Error('Could not create default PMU form templates.');
        });
    },
    onSuccess(tenantSlug) {
      showOverlayAndRedirect({
        title: 'Success!',
        route: {
          name: 'TenantIntro',
          params: { tenantSlug }
        }
      });
    }
  }
};
</script>
