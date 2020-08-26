<template>
  <div class="shadow-1dp px-2 py-6 rounded-lg mb-4 bg-surface">
    <MaterialInput
      margin="mb-6"
      v-model="$v.client.firstName.$model"
      label="First Name"
      :error="$v.client.firstName.$error"
    >
      <p v-if="!$v.client.firstName.required" class="text-error text-xs">
        First Name is required
      </p>
    </MaterialInput>
    <MaterialInput
      margin="mb-6"
      v-model="$v.client.lastName.$model"
      label="Last Name"
      :error="$v.client.lastName.$error"
    >
      <p v-if="!$v.client.lastName.required" class="text-error text-xs">
        Last Name is required
      </p>
    </MaterialInput>
    <MaterialInput
      margin="mb-6"
      v-model="$v.client.phoneNumber.$model"
      label="Phone Number"
      :error="$v.client.phoneNumber.$error"
    >
      <p v-if="!$v.client.phoneNumber.required" class="text-error text-xs">
        Phone number is required
      </p>
      <p
        v-else-if="
          !$v.client.phoneNumber.minLength ||
            !$v.client.phoneNumber.isPhoneNumberValid
        "
        class="text-error text-xs"
      >
        Please enter a valid phone numb er
      </p>
    </MaterialInput>
    <MaterialInput
      :margin="null"
      v-model="$v.client.email.$model"
      label="Email"
      :error="$v.client.email.$error"
      :attrs="{ readonly: true }"
    >
      <p v-if="!$v.client.email.required" class="text-error text-xs">
        Email is required
      </p>
      <p v-else-if="!$v.client.email.email" class="text-error text-xs">
        Please enter a email address
      </p>
    </MaterialInput>

    <div class="py-6">
      <Button class="rounded-full" title="Save" @clicked="save" />
      <Button
        class="mt-8"
        textColor="text-error"
        title="Delete Client"
        theme="none"
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
        theme="none"
        @clicked="isDeleteModalOpen = false"
        width="w-auto"
        :margin="null"
      />
      <Button
        textColor="text-error"
        title="Delete"
        theme="none"
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
import Button from '@/components/inputs/Button.vue';

export default {
  name: 'EditClientInfo',
  components: {
    MaterialInput,
    BaseDialog,
    Button
  }
};
</script>
