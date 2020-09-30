<template>
  <div class="shadow-1dp px-2 py-6 rounded-lg mb-4 bg-surface">
    <MaterialInput
      margin="mb-6"
      v-model.trim="$v.client.firstName.$model"
      label="First Name"
      :validatorModel="$v.client.firstName"
    >
      <p v-if="!$v.client.firstName.required">
        First Name is required
      </p>
    </MaterialInput>
    <MaterialInput
      margin="mb-6"
      v-model.trim="$v.client.lastName.$model"
      label="Last Name"
      :validatorModel="$v.client.lastName"
    >
      <p v-if="!$v.client.lastName.required">
        Last Name is required
      </p>
    </MaterialInput>
    <MaterialInput
      margin="mb-6"
      v-model.trim="$v.client.phoneNumber.$model"
      label="Phone Number"
      :validatorModel="$v.client.phoneNumber"
    >
      <p v-if="!$v.client.phoneNumber.required">
        Phone number is required
      </p>
      <p
        v-else-if="
          !$v.client.phoneNumber.minLength ||
            !$v.client.phoneNumber.isPhoneNumberValid
        "
      >
        Please enter a valid phone numb er
      </p>
    </MaterialInput>
    <MaterialInput
      :margin="null"
      v-model.trim="$v.client.email.$model"
      label="Email"
      :validatorModel="$v.client.email"
      :attrs="{ readonly: true }"
    >
      <p v-if="!$v.client.email.required">
        Email is required
      </p>
      <p v-else-if="!$v.client.email.email">
        Please enter a email address
      </p>
    </MaterialInput>

    <div class="py-6">
      <Button class="rounded-full" title="Save" @clicked="save" />
      <Button
        class="mt-8"
        textColor="text-error"
        title="Delete Client"
        :background="null"
        @clicked="isDeleteModalOpen = true"
      />
    </div>

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
</template>

<script>
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import BaseDialog from '@/components/BaseDialog.vue';

import { required, minLength, email } from 'vuelidate/lib/validators';
import { isPhoneNumberValid } from '@/helpers';
import { showOverlayAndRedirect } from '@/helpers.js';
import { mapActions } from 'vuex';

export default {
  name: 'EditClientInfo',
  components: {
    MaterialInput,
    BaseDialog
  },
  props: {
    client: {
      type: Object,
      required: true
    },
    tenantSlug: {
      type: String,
      required: true
    },
    clientId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      isDeleteModalOpen: false
    };
  },
  validations: {
    client: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      phoneNumber: {
        required,
        minLength: minLength(10),
        isPhoneNumberValid
      },
      email: {
        required,
        email
      }
    }
  },
  methods: {
    ...mapActions('client', ['updateClient', 'archiveClient']),
    save() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.updateClient({
        tenantSlug: this.tenantSlug,
        clientId: this.clientId,
        body: this.client
      }).then(async () => {
        showOverlayAndRedirect({
          title: 'Success!',
          message: 'Client updated successfully!',
          route: { name: 'ClientEdit' }
        });
      });
    },

    archive() {
      this.archiveClient({
        tenantSlug: this.tenantSlug,
        clientId: this.clientId
      }).then(async () => {
        this.isDeleteModalOpen = false;
        showOverlayAndRedirect({
          title: 'Success!',
          message: 'Client archived successfully!',
          route: { name: 'ClientList' }
        });
      });
    }
  }
};
</script>
