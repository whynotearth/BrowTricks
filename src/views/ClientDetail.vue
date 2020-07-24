<template>
  <div class="bg-background text-left min-h-screen" v-if="client">
    <BaseHeader
      slot="header"
      class="bg-footer text-white"
      @iconClicked="goBack"
    >
      <ArrowBack slot="icon" class="h-6 w-6 fill-current" />
      <span slot="content" class="pl-5">Client Profile</span>
    </BaseHeader>
    <div
      class="bg-on-background bg-opacity-high py-8 px-4 text-white h-auto flex flex-col items-center"
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
        class="flex justify-between tg-caption-mobile pb-16 w-full sm:w-auto"
      >
        <div class="hidden flex flex-col items-center px-4 sm:px-8">
          <BookIcon class="fill-current" />
          <span>Book</span>
        </div>
        <a
          class="flex flex-col items-center px-4 sm:px-8"
          :href="`mailto:${client.email}`"
        >
          <MailIcon class="fill-current" />
          <span>Email</span>
        </a>
        <a
          class="flex flex-col items-center px-4 sm:px-8"
          :href="`sms:${client.phoneNumber}`"
        >
          <PhoneAndroidIcon class="fill-current" />
          <span>Text</span>
        </a>
        <a
          class="flex flex-col items-center px-4 sm:px-8"
          :href="`tel:${client.phoneNumber}`"
        >
          <PhoneIcon class="fill-current" />
          <span>Call</span>
        </a>
      </div>
    </div>
    <div class="max-w-md mx-auto">
      <div class="m-4 -mt-10 bg-white shadow-1dp py-4 px-2 rounded-lg">
        <material-input
          v-model="$v.client.firstName.$model"
          label="First Name"
          labelBg="bg-white"
          :error="$v.client.firstName.$dirty && !$v.client.firstName.required"
        >
          <span
            v-if="$v.client.firstName.$dirty && !$v.client.firstName.required"
            class="text-red-600 text-xs"
          >
            First Name is required
          </span>
        </material-input>
        <material-input
          v-model="$v.client.lastName.$model"
          label="Last Name"
          labelBg="bg-white"
          :error="$v.client.lastName.$dirty && !$v.client.lastName.required"
        >
          <span
            v-if="$v.client.lastName.$dirty && !$v.client.lastName.required"
            class="text-red-600 text-xs"
          >
            Last Name is required
          </span>
        </material-input>
        <material-input
          v-model="$v.client.phoneNumber.$model"
          label="Phone Number"
          labelBg="bg-white"
          :error="
            $v.client.phoneNumber.$dirty &&
              (!$v.client.phoneNumber.required ||
                !$v.client.phoneNumber.minLength)
          "
        >
          <span
            v-if="
              $v.client.phoneNumber.$dirty && !$v.client.phoneNumber.required
            "
            class="text-red-600 text-xs"
          >
            Phone number is required
          </span>
          <span
            v-if="
              $v.client.phoneNumber.$dirty &&
                (!$v.client.phoneNumber.minLength ||
                  !$v.client.phoneNumber.isPhoneNumberValid)
            "
            class="text-red-600 text-xs"
          >
            Please enter a valid phone number
          </span>
        </material-input>
        <material-input
          v-model="$v.client.email.$model"
          label="Email"
          labelBg="bg-white"
          :error="
            $v.client.email.$dirty &&
              (!$v.client.email.required || !$v.client.email.email)
          "
        >
          <span
            v-if="$v.client.email.$dirty && !$v.client.email.required"
            class="text-red-600 text-xs"
          >
            Email is required
          </span>
          <span
            v-if="$v.client.email.$dirty && !$v.client.email.email"
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
      <ExpansionPanel
        title="Images"
        middleText="Incomplete"
        @click="
          $router.push({
            name: 'ClientImageUpload',
            params: { ...$route.params }
          })
        "
      >
        <ImagesIcon slot="preIcon" class="h-6 w-6 fill-current" />
      </ExpansionPanel>
      <ExpansionPanel
        @click="
          $router.push({
            name: 'PMUFlowStart',
            params: { clientId, tenantSlug }
          })
        "
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
        <Button
          class="mt-8 tg-body-mobile text-error text-opacity-medium pb-4"
          title="Archive Client"
          background="bg-transparent"
          :isRipple="false"
          @clicked="isArchiveModalOpen = true"
        />
      </div>
      <div
        v-if="isArchiveModalOpen"
        class="z-50 fixed inset-0 bg-on-background bg-opacity-25"
        @click="isArchiveModalOpen = false"
      >
        <div class="h-full w-screen flex justify-center items-center">
          <div @click.stop class="bg-white rounded-lg w-full mx-4 p-8 sm:w-128">
            <h6 class="text-on-background text-opacity-medium">
              Archive Client?
            </h6>
            <div class="flex justify-end">
              <Button
                class="mt-8 tg-body-mobile text-error"
                title="Cancel"
                background="bg-transparent"
                :isRipple="false"
                @clicked="isArchiveModalOpen = false"
                width="w-auto"
              />
              <Button
                class="mt-8 tg-body-mobile text-secondary"
                title="Archive"
                background="bg-transparent"
                :isRipple="false"
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
import BaseHeader from '@/components/BaseHeader.vue';
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import Button from '@/components/Button.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';

import ArrowBack from '@/assets/icons/arrow-back.svg';
import Document from '@/assets/icons/document.svg';
import Notes from '@/assets/icons/notes.svg';
import Notification from '@/assets/icons/notification.svg';
import ImagesIcon from '@/assets/icons/images.svg';

import BookIcon from '@/assets/icons/calendar_today.svg';
import MailIcon from '@/assets/icons/mail.svg';
import PhoneIcon from '@/assets/icons/phone.svg';
import PhoneAndroidIcon from '@/assets/icons/phone_android.svg';

import { isPhoneNumberValid } from '@/helpers';
import { mapGetters, mapActions } from 'vuex';
import { sleep } from '@/helpers.js';

export default {
  name: 'AddEditClient',
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
    BaseHeader,
    ArrowBack,
    MaterialInput,
    Button,
    Document,
    Notes,
    Notification,
    ImagesIcon,
    ExpansionPanel,
    BookIcon,
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
    this.fetchClients(this.tenantSlug);
    this.client = await this.getClientById(this.clientId);
    if (!this.client) {
      this.goBack();
    }
  },
  computed: {
    ...mapGetters('client', ['getClientById'])
  },
  methods: {
    ...mapActions('client', ['updateClient', 'archiveClient', 'fetchClients']),
    save() {
      if (!this.$v.$invalid) {
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
      }
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
        this.goBack();
        await sleep(1500);
        this.$store.commit('overlay/updateModel', {
          title: '',
          message: ''
        });
      });
    },
    goBack() {
      this.$router.push({
        name: 'ClientList',
        params: { slug: this.tenantSlug }
      });
    }
  }
};
</script>
