<template>
  <div class="text-left text-on-background text-opacity-high" v-if="client">
    <!-- header -->
    <BaseHeroSection>
      <img class="h-12 rounded-full" :src="logo" alt="user-logo" />
      <h3 class="py-6 tg-h2-mobile text-on-background">
        {{ client.firstName }} {{ client.lastName }}
      </h3>
      <div class="flex justify-around tg-caption-mobile w-full sm:w-auto">
        <a
          class="flex flex-col items-center px-4 sm:px-8 text-secondary"
          :href="`mailto:${client.email}`"
        >
          <IconMail class="fill-current mb-2" />
          <span class="text-on-background text-opacity-high">Email</span>
        </a>
        <a
          class="flex flex-col items-center px-4 sm:px-8 text-secondary"
          :href="`sms:${client.phoneNumber}`"
        >
          <IconPhoneAndroid class="fill-current mb-2" />
          <span class="text-on-background text-opacity-high">Text</span>
        </a>
        <a
          class="flex flex-col items-center px-4 sm:px-8 text-secondary"
          :href="`tel:${client.phoneNumber}`"
        >
          <IconPhone class="fill-current mb-2" />
          <span class="text-on-background text-opacity-high">Call</span>
        </a>
      </div>
    </BaseHeroSection>

    <!-- content -->
    <div class="max-w-md mx-auto px-4 -mt-16">
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
            Please enter a valid phone number
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
      </div>
      <ExpansionPanel
        title="Notification Settings"
        @click="
          $router.push({
            name: 'ClientNotifications'
          })
        "
      >
        <template #preIcon>
          <IconNotification class="h-6 w-6 fill-current" />
        </template>
      </ExpansionPanel>
      <ExpansionPanel
        title="Uploads"
        @click="
          $router.push({
            name: 'ClientUploads'
          })
        "
      >
        <template #preIcon>
          <IconImages slot="preIcon" class="h-6 w-6 fill-current" />
        </template>
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
        <template #preIcon>
          <IconDocument slot="preIcon" class="h-6 w-6 fill-current" />
        </template>
      </ExpansionPanel>

      <ExpansionPanel
        @click="$router.push({ name: 'ClientNotes' })"
        title="Notes"
      >
        <template #preIcon>
          <IconNotes slot="preIcon" class="h-6 w-6 fill-current" />
        </template>
      </ExpansionPanel>
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
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import Button from '@/components/inputs/Button.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import BaseDialog from '@/components/BaseDialog.vue';
import BaseHeroSection from '@/components/BaseHeroSection.vue';

import IconDocument from '@/assets/icons/document.svg';
import IconNotes from '@/assets/icons/notes.svg';
import IconNotification from '@/assets/icons/notification.svg';
import IconImages from '@/assets/icons/images.svg';
import IconMail from '@/assets/icons/mail.svg';
import IconPhone from '@/assets/icons/phone.svg';
import IconPhoneAndroid from '@/assets/icons/phone_android.svg';

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
    BaseDialog,
    BaseHeroSection,
    IconDocument,
    IconNotes,
    IconNotification,
    IconImages,
    IconMail,
    IconPhone,
    IconPhoneAndroid,
    MaterialInput,
    Button,
    ExpansionPanel
  },
  data() {
    return {
      logo: process.env.VUE_APP_LOGO2_URL,
      client: null,
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
        this.isDeleteModalOpen = false;
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
