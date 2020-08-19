<template>
  <div class="mt-8 max-w-6xl mx-auto">
    <!-- request by text -->
    <!-- <div class="py-6 px-2 max-w-sm mx-auto">
        <Button
          v-if="hasNotificationEmail"
          class="rounded-full"
          :href="`mailto:${this.client.email}`"
          :title="`Request by email ${this.client.email}`"
        />
        <Button
          v-else-if="hasNotificationPhone"
          class="rounded-full"
          @clicked="sendRequest('SMS')"
          :title="`Request by text ${this.client.phoneNumber}`"
        />
      </div> -->

    <!-- uploader -->
    <VideoUpload
      :files="currentFiles"
      @change="updateFiles"
      class="mb-4"
      :uploadPreset="uploadPreset"
    >
      <template #title>
        <div class="tg-body-mobile ">
          <span class="text-on-background text-opacity-high">Videos</span>
        </div>
      </template>
    </VideoUpload>
  </div>
</template>

<script>
import VideoUpload from '@/components/uploader/VideoUpload.vue';
import { mapActions } from 'vuex';
import { get } from 'lodash-es';

export default {
  name: 'ClientVideoUpload',
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
    VideoUpload
  },
  data() {
    return {
      uploadPreset: process.env.VUE_APP_UPLOADER_VIDEO_PRESET,
      client: null
    };
  },
  async created() {
    this._fetchClient();
  },
  computed: {
    hasNotificationEmail() {
      const notificationTypes = get(this.client, 'notificationTypes', []);
      return notificationTypes.includes('email');
    },
    hasNotificationPhone() {
      const notificationTypes = get(this.client, 'notificationTypes', []);
      return notificationTypes.includes('phone');
    },
    currentFiles() {
      return get(this.client, 'videos', []);
    }
  },
  methods: {
    ...mapActions('client', ['updateClient', 'fetchClient']),
    async _fetchClient() {
      this.client = await this.fetchClient({
        params: {
          clientId: this.clientId,
          tenantSlug: this.tenantSlug
        }
      }).catch(() => {
        console.log('error in getting client');
        this.goToDetailPage();
      });
    },
    goToDetailPage() {
      this.$router.push({ name: 'ClientEdit' });
    },
    sendRequest(notificationType) {
      console.log('TODO: send request', notificationType);
    },
    updateFiles(files) {
      const videosAdapted = files.map(item => ({
        url: item.url,
        publicId: item.publicId
      }));
      const updatedInfo = {
        ...this.client,
        videos: videosAdapted,
        images: this.client.images
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
