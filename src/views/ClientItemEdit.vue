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
                Phone number is required
              </p>
              <p v-else-if="!$v.phoneNumber.isPhoneNumberValid">
                Enter a valid phone number please
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
            <Button type="submit" title="Save" />
          </div>
        </form>

        <Button
          class="mt-8"
          textColor="text-error"
          title="Delete Client"
          :background="null"
          @clicked="isDeleteModalOpen = true"
        />

        <BaseDialog
          v-if="isDeleteModalOpen"
          @close="isDeleteModalOpen = false"
          title="Delete Client?"
        >
          <Button
            textColor="text-on-primary text-opacity-medium"
            title="Cancel"
            :background="null"
            @clicked="isDeleteModalOpen = false"
            width="w-auto"
            :margin="null"
          />
          <Button
            textColor="text-error"
            title="Delete"
            :background="null"
            @clicked="archive"
            width="w-auto"
            :margin="null"
          />
        </BaseDialog>
      </div>
    </div>
  </PageContentBoard>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { isPhoneNumberValid, showOverlayAndRedirect } from '@/helpers';
import formGeneralUtils from '@/mixins/formGeneralUtils.js';
import BaseDialog from '@/components/BaseDialog.vue';
import PhoneInput from '@/components/inputs/PhoneInput';

export default {
  name: 'ClientItemEdit',
  // NOTE: we use a mixin
  mixins: [formGeneralUtils],
  components: { BaseDialog, PhoneInput },
  props: ['tenantSlug', 'client'],
  data() {
    return {
      isDeleteModalOpen: false,
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
  created() {
    this.init();
  },
  methods: {
    ...mapActions('client', ['updateClient', 'archiveClient']),
    init() {
      this.firstName = this.client.firstName;
      this.lastName = this.client.lastName;
      this.phoneNumber = this.client.phoneNumber;
      this.email = this.client.email;
    },
    submit() {
      if (!this.beforeSubmit()) {
        return;
      }

      this.updateClient({
        params: {
          tenantSlug: this.tenantSlug,
          clientId: this.client.id,
          body: {
            ...this.client,

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
          name: 'ClientInfo'
        }
      });
    },
    archive() {
      this.archiveClient({
        tenantSlug: this.tenantSlug,
        clientId: this.client.id
      }).then(async () => {
        this.isDeleteModalOpen = false;
        showOverlayAndRedirect({
          title: 'Success!',
          message: 'Client deleted successfully!',
          route: { name: 'ClientList' }
        });
      });
    }
  }
};
</script>
