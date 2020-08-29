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
    <div class="max-w-md mx-auto px-4 -mt-10">
      <ExpansionPanel
        title="Edit Profile"
        @click="
          $router.push({
            name: 'ClientInfoEdit',
            params: {
              tenantSlug: tenantSlug,
              clientId: clientId,
              client: client
            }
          })
        "
      >
        <template #preIcon>
          <IconNotification class="h-6 w-6 fill-current" />
        </template>
      </ExpansionPanel>

      <MediaManager :files="currentFiles" @change="updateFiles" class="mb-4">
        <template #title>
          <div class="tg-body-mobile ">
            <span class="text-on-background text-opacity-high"></span>
          </div>
        </template>
      </MediaManager>
    </div>
  </div>
</template>

<script>
// import MaterialInput from '@/components/inputs/MaterialInput.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import BaseHeroSection from '@/components/BaseHeroSection.vue';
import MediaManager from '@/components/uploader/MediaManager.vue';

// import IconDocument from '@/assets/icons/document.svg';
// import IconNotes from '@/assets/icons/notes.svg';
import IconNotification from '@/assets/icons/notification.svg';
// import IconImages from '@/assets/icons/images.svg';
import IconMail from '@/assets/icons/mail.svg';
import IconPhone from '@/assets/icons/phone.svg';
import IconPhoneAndroid from '@/assets/icons/phone_android.svg';
import { get } from 'lodash-es';
import { mapActions } from 'vuex';

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
    // BaseDialog,
    BaseHeroSection,
    // IconDocument,
    // IconNotes,
    IconNotification,
    // IconImages,
    IconMail,
    IconPhone,
    IconPhoneAndroid,
    // MaterialInput,
    // Button,
    ExpansionPanel,
    MediaManager
  },
  data() {
    return {
      logo: process.env.VUE_APP_LOGO2_URL,
      uploadPreset: process.env.VUE_APP_UPLOADER_MEDIA_PRESET,
      client: null
    };
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
    },
    currentFiles() {
      return [
        ...get(this.client, 'images', []).map(item => ({
          ...item,
          resourceType: 'image'
        })),
        ...get(this.client, 'videos', []).map(item => ({
          ...item,
          resourceType: 'video'
        }))
      ];
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
    goListPage() {
      this.$router.push({
        name: 'ClientList'
      });
    },
    updateFiles(files) {
      console.log('files before updatefiles', files);
      const filesAdapted = files.map(item => ({
        ...item,
        url: item.url,
        publicId: item.publicId
      }));
      console.log('files after', filesAdapted);
      const images = filesAdapted.filter(item => item.resourceType === 'image');
      const videos = filesAdapted.filter(item => item.resourceType === 'video');
      const updatedInfo = {
        ...this.client,
        images,
        videos
      };
      this.updateClient({
        tenantSlug: this.tenantSlug,
        clientId: this.clientId,
        body: updatedInfo
      })
        .then(() => {
          this._fetchClient();
        })
        .catch(error => {
          console.log('Update client error', error.response);
        });
    }
  }
};
</script>
