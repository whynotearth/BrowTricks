<template>
  <div class="bg-background text-left" v-if="client">
    <div
      class="bg-opacity-high pt-8 px-4 text-white h-auto flex flex-col items-center"
    >
      <img
        class="w-16 h-16 rounded-full"
        :src="
          client.avatarUrl ||
            'https://res.cloudinary.com/whynotearth/image/upload/v1595228411/BrowTricks/avatar-placeholder_dphhvx.png'
        "
        alt="user-logo"
      />
      <h3 class="py-4 tg-h1-mobile">
        {{ client.firstName }} {{ client.lastName }}
      </h3>
      <div
        class="flex justify-around tg-caption-mobile pb-16 w-full sm:w-auto"
      >
        <a
          class="flex flex-col items-center px-4 sm:px-8 text-secondary"
          :href="`mailto:${client.email}`"
        >
          <MailIcon class="fill-current mb-2" />
          <span>Email</span>
        </a>
        <a
          class="flex flex-col items-center px-4 sm:px-8 text-secondary"
          :href="`sms:${client.phoneNumber}`"
        >
          <PhoneAndroidIcon class="fill-current mb-2" />
          <span>Text</span>
        </a>
        <a
          class="flex flex-col items-center px-4 sm:px-8 text-secondary"
          :href="`tel:${client.phoneNumber}`"
        >
          <PhoneIcon class="fill-current mb-2" />
          <span>Call</span>
        </a>
      </div>
    </div>
    <div class="max-w-md mx-auto px-4">
      <div class="shadow-1dp px-2 py-6 rounded-lg mb-4 bg-surface">
        <MaterialInput
          margin="mb-6"
          theme="dark"
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
          theme="dark"
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
          theme="dark"
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
            Please enter a valid phone number
          </p>
        </MaterialInput>
        <MaterialInput
          :margin="null"
          theme="dark"
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
      </div>
      <ExpansionPanel
        title="Notification Settings"
        @click="
          $router.push({
            name: 'ClientNotifications'
          })
        "
      >
        <Notification slot="preIcon" class="h-6 w-6 fill-current" />
      </ExpansionPanel>
      <ExpansionPanel
        title="Uploads"
        @click="
          $router.push({
            name: 'ClientUploads'
          })
        "
      >
        <ImagesIcon slot="preIcon" class="h-6 w-6 fill-current" />
      </ExpansionPanel>

      <!-- incompleted PMU -->
      <!-- TODO: enable -->
      <!-- <ExpansionPanel
        v-if="isPmuIncomplete"
        @click="
          $router.push({
            name: 'PmuSignMethods',
            params: { clientId, tenantSlug }
          })
        "
        title="PMU"
        :middleText="client.pmuStatus"
      >
        <Document slot="preIcon" class="h-6 w-6 fill-current" />
      </ExpansionPanel> -->

      <!-- completed PMU -->
      <!-- v-else -->
      <ExpansionPanel
        @click="
          $router.push({
            name: 'PmuSign',
            params: { clientId, tenantSlug }
          })
        "
        title="PMU"
        :middleText="client.pmuStatus"
      >
        <Document slot="preIcon" class="h-6 w-6 fill-current" />
      </ExpansionPanel>

      <ExpansionPanel
        @click="$router.push({ name: 'ClientNotes' })"
        title="Notes"
      >
        <Notes slot="preIcon" class="h-6 w-6 fill-current" />
      </ExpansionPanel>
      <div class="py-6">
        <Button class="rounded-full" title="Save" @clicked="save" />
        <Button
          class="mt-8 tg-body-mobile text-error pb-4"
          title="Delete Client"
          background="bg-transparent"
          @clicked="isArchiveModalOpen = true"
        />
      </div>
      <div
        v-if="isArchiveModalOpen"
        class="z-50 fixed inset-0 bg-on-background bg-opacity-25"
        @click="isArchiveModalOpen = false"
      >
        <div class="h-full w-screen flex justify-center items-center">
          <div @click.stop class="rounded-lg w-full mx-4 p-8 sm:w-128">
            <h6 class="text-on-background text-opacity-medium">
              Archive Client?
            </h6>
            <div class="flex justify-end">
              <Button
                class="mt-8 tg-body-mobile text-error"
                title="Cancel"
                background="bg-transparent"
                @clicked="isArchiveModalOpen = false"
                width="w-auto"
              />
              <Button
                class="mt-8 tg-body-mobile text-secondary"
                title="Archive"
                background="bg-transparent"
                @clicked="archive"
                width="w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import Button from '@/components/inputs/Button.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';

import Document from '@/assets/icons/document.svg';
import Notes from '@/assets/icons/notes.svg';
import Notification from '@/assets/icons/notification.svg';

import ImagesIcon from '@/assets/icons/images.svg';
import MailIcon from '@/assets/icons/mail.svg';
import PhoneIcon from '@/assets/icons/phone.svg';
import PhoneAndroidIcon from '@/assets/icons/phone_android.svg';

import { isPhoneNumberValid } from '@/helpers';
import { mapActions } from 'vuex';
import { sleep } from '@/helpers.js';

export default {
  name: 'ClientEdit',
  props: {
    tenantSlug: {
      type: String,
      required: true
    },
    clientId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    MaterialInput,
    Button,
    Document,
    Notes,
    Notification,
    ImagesIcon,
    ExpansionPanel,
    MailIcon,
    PhoneIcon,
    PhoneAndroidIcon
  },
  data() {
    return {
      client: null,
      isArchiveModalOpen: false
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
  async created() {
    this._fetchClient();
  },
  computed: {
    isPmuIncomplete() {
      if (!this.client) {
        return false;
      }
      return this.client.pmuStatus === 'incomplete';
    }
  },
  methods: {
    ...mapActions('client', ['updateClient', 'archiveClient', 'fetchClient']),
    async _fetchClient() {
      this.client = await this.fetchClient({
        params: {
          clientId: this.clientId,
          tenantSlug: this.tenantSlug
        }
      }).catch(() => {
        console.log('error in getting client');
        this.goListPage();
      });
    },

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
        this.$store.commit('overlay/updateModel', {
          title: 'Success!',
          message: 'Client updated successfully!'
        });
        await sleep(1500);
        this.$store.commit('overlay/updateModel', {
          title: '',
          message: ''
        });
      });
    },

    archive() {
      this.archiveClient({
        tenantSlug: this.tenantSlug,
        clientId: this.clientId
      }).then(async () => {
        this.isArchiveModalOpen = false;
        this.$store.commit('overlay/updateModel', {
          title: 'Success!',
          message: 'Client archived successfully!'
        });
        this.goListPage();
        await sleep(1500);
        this.$store.commit('overlay/updateModel', {
          title: '',
          message: ''
        });
      });
    },

    goListPage() {
      this.$router.push({
        name: 'ClientList'
      });
    }
  }
};
</script>
