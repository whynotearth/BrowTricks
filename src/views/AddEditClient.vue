<template>
  <div class="bg-surface text-left min-h-screen">
    <BaseHeader
      slot="header"
      class="bg-footer text-white"
      @iconClicked="goBack"
    >
      <ArrowBack slot="icon" class="h-6 w-6 fill-current" />
      <span slot="content" class="pl-5">Add Client</span>
    </BaseHeader>
    <div class="m-4 bg-white shadow-1dp py-4 px-2 rounded-lg">
      <material-input
        v-model="$v.firstName.$model"
        label="First Name"
        labelBg="bg-white"
        :error="$v.firstName.$dirty && !$v.firstName.required"
      >
        <span
          v-if="$v.firstName.$dirty && !$v.firstName.required"
          class="text-red-600 text-xs"
        >
          First Name is required
        </span>
      </material-input>
      <material-input
        v-model="$v.lastName.$model"
        label="Last Name"
        labelBg="bg-white"
        :error="$v.lastName.$dirty && !$v.lastName.required"
      >
        <span
          v-if="$v.lastName.$dirty && !$v.lastName.required"
          class="text-red-600 text-xs"
        >
          Last Name is required
        </span>
      </material-input>
      <material-input
        v-model="$v.phone.$model"
        label="Phone Number"
        labelBg="bg-white"
        :error="$v.phone.$dirty && (!$v.phone.required || !$v.phone.minLength)"
      >
        <span
          v-if="$v.phone.$dirty && !$v.phone.required"
          class="text-red-600 text-xs"
        >
          Phone number is required
        </span>
        <span v-if="!$v.phone.minLength" class="text-red-600 text-xs">
          Please enter a valid phone number
        </span>
      </material-input>
      <material-input
        v-model="$v.email.$model"
        label="Email"
        labelBg="bg-white"
        :error="$v.email.$dirty && (!$v.email.required || !$v.email.minLength)"
      >
        <span
          v-if="$v.email.$dirty && !$v.email.required"
          class="text-red-600 text-xs"
        >
          Email is required
        </span>
        <span
          v-if="$v.email.$dirty && !$v.email.email"
          class="text-red-600 text-xs"
        >
          Please enter a email address
        </span>
      </material-input>
    </div>
    <ExpansionPanel
      title="Notification Settings"
      @click="$router.push({ name: 'Notifications' })"
    >
      <Notification slot="preIcon" class="h-6 w-6 fill-current" />
    </ExpansionPanel>
    <hr class="mt-12 mb-8" />
    <ImageUpload v-model="images" :defaultImages="[]">
      <template #title>
        <div class="tg-body-mobile ">
          <span class="text-on-background text-opacity-high"> Image </span>
          <span class="text-on-background text-opacity-medium">
            ( 500 x 599 pixels JPEG / PNG )
          </span>
        </div>
      </template>
    </ImageUpload>
    <hr class="my-4" />
    <ImageUpload id="files" v-model="files" :defaultImages="[]">
      <template #title>
        <div class="tg-body-mobile ">
          <span class="text-on-background text-opacity-high"> Files </span>
        </div>
      </template>
    </ImageUpload>
    <hr class="mt-12 mb-8" />
    <ExpansionPanel
      @click="$router.push({ name: 'PMU' })"
      title="PMU"
      middleText="Incomplete"
    >
      <Document slot="preIcon" class="h-6 w-6 fill-current" />
    </ExpansionPanel>
    <ExpansionPanel @click="$router.push({ name: 'Notes' })" title="Notes">
      <Notes slot="preIcon" class="h-6 w-6 fill-current" />
    </ExpansionPanel>
    <div class="mt-4 mx-4 py-6 px-2">
      <Button
        class="rounded-full"
        title="Save"
        :isRipple="false"
        @clicked="save"
      />
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import BaseHeader from '@/components/BaseHeader.vue';
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import ImageUpload from '@/components/imageUpload/ImageUpload.vue';
import Button from '@/components/Button.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';

import ArrowBack from '@/assets/icons/arrow_back.svg';
import Document from '@/assets/icons/document.svg';
import Notes from '@/assets/icons/notes.svg';
import Notification from '@/assets/icons/notification.svg';

export default {
  name: 'AddEditClient',
  components: {
    BaseHeader,
    ArrowBack,
    MaterialInput,
    ImageUpload,
    Button,
    Document,
    Notes,
    Notification,
    ExpansionPanel
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      images: [],
      files: []
    };
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    phone: {
      required,
      minLength: minLength(7)
    },
    email: {
      required,
      email
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'CustomerHome' });
    },
    save() {}
  }
};
</script>
