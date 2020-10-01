<template>
  <PageContentBoard>
    <div class="text-left" v-if="client">
      <HeaderHeroSection class="bg-pattern pb-16">
        <!-- header -->
        <div class="text-center mb-6">
          <img class="h-12 rounded-full mx-auto" :src="logo" alt="user-logo" />
          <h3 class="py-6 tg-h2-mobile text-on-background">
            {{ client.firstName }} {{ client.lastName }}
          </h3>
          <div class="flex justify-around tg-caption-mobile w-full sm:w-auto">
            <a
              class="flex flex-col items-center px-4 sm:px-8 text-on-surface"
              :href="`mailto:${client.email}`"
            >
              <IconMail class="fill-current mb-2" />
              <span class="text-on-background text-opacity-high">Email</span>
            </a>
            <a
              class="flex flex-col items-center px-4 sm:px-8 text-on-surface"
              :href="`sms:${client.phoneNumber}`"
            >
              <IconPhoneAndroid class="fill-current mb-2" />
              <span class="text-on-background text-opacity-high">Text</span>
            </a>
            <a
              class="flex flex-col items-center px-4 sm:px-8 text-on-surface"
              :href="`tel:${client.phoneNumber}`"
            >
              <IconPhone class="fill-current mb-2" />
              <span class="text-on-background text-opacity-high">Call</span>
            </a>
          </div>
        </div>

        <div class="w-full">
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
              <IconNotification class="h-4 w-4 fill-current" />
            </template>
          </ExpansionPanel>

          <!-- incompleted PMU -->
          <!-- :middleText="pmuMiddleText" -->
          <ExpansionPanel
            @click="
              $router.push({
                name: 'PmuSignTemplateSelector',
                params: { clientId, tenantSlug }
              })
            "
            title="PMU Forms"
          >
            <template #preIcon>
              <IconDocument class="h-4 w-4 fill-current" />
            </template>
          </ExpansionPanel>

          <ExpansionPanel
            @click="$router.push({ name: 'ClientNotes' })"
            title="Notes"
          >
            <template #preIcon>
              <IconNotes class="h-4 w-4 fill-current" />
            </template>
          </ExpansionPanel>
        </div>
      </HeaderHeroSection>

      <!-- content -->
      <div class="-mt-8">
        <div class="max-w-md mx-auto px-6 sm:px-0">
          <MediaManager
            :files="currentFiles"
            @change="updateFiles"
            class="mb-4"
          >
            <template #uploadButton>
              <a
                tabindex="0"
                class="upload-add bg-surface border-brand2 border border-opacity-medium flex justify-center items-center p-4 cursor-pointer"
                aria-label="Upload"
                @click="_openDrawerUploadUpdate"
              >
                <IconCamera
                  class="fill-current text-on-background text-opacity-medium w-10 h-10"
                />
              </a>
            </template>
            <template #title>
              <div class="tg-body-mobile ">
                <span class="text-on-background text-opacity-high"></span>
              </div>
            </template>
          </MediaManager>
        </div>
      </div>
    </div>
  </PageContentBoard>
</template>

<script>
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import PageContentBoard from '@/components/PageContentBoard.vue';
import HeaderHeroSection from '@/components/HeaderHeroSection.vue';
import MediaManager from '@/components/uploader/MediaManager.vue';

import IconDocument from '@/assets/icons/document.svg';
import IconNotes from '@/assets/icons/notes.svg';
import IconNotification from '@/assets/icons/notification.svg';
// import IconImages from '@/assets/icons/images.svg';
import IconMail from '@/assets/icons/mail.svg';
import IconPhone from '@/assets/icons/phone.svg';
import IconCamera from '@/assets/icons/camera.svg';
import IconPhoneAndroid from '@/assets/icons/phone_android.svg';
import { get } from 'lodash-es';
import { mapActions } from 'vuex';
import { UploaderTypes } from '@/services/uploader';

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
    PageContentBoard,
    HeaderHeroSection,
    IconDocument,
    IconNotes,
    IconNotification,
    IconCamera,
    IconMail,
    IconPhone,
    IconPhoneAndroid,
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
    pmuMiddleText() {
      const completedPmuCount = get(this.client, 'signatures', []).length;
      return `Signed: ${completedPmuCount}`;
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
    ...mapActions('uploader', ['openDrawerUploadUpdate']),
    _openDrawerUploadUpdate() {
      this.openDrawerUploadUpdate(UploaderTypes.CLIENT);
    },
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
