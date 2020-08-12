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
    <ImageUpload
      :files="currentImages"
      @change="updateImages"
      class="mb-4"
      :uploadPreset="uploadPreset"
    >
      <template #title>
        <div class="tg-body-mobile ">
          <span class="text-on-newbackground text-opacity-high">Uploads</span>
        </div>
      </template>
    </ImageUpload>
  </div>
</template>

<script>
import ImageUpload from '@/components/uploader/ImageUpload.vue';
import { mapActions } from 'vuex';
import { get } from 'lodash-es';

export default {
  name: 'ClientImageUpload',
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
    ImageUpload
  },
  data() {
    return {
      uploadPreset: process.env.VUE_APP_UPLOADER_IMAGE_PRESET,
      client: null,
      images: []
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
    currentImages() {
      return get(this.client, 'images', []);
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
    updateImages(images) {
      const imagesAdapted = images.map(item => ({
        url: item.url,
        publicId: item.publicId
      }));
      const updatedInfo = {
        ...this.client,
        images: imagesAdapted,
        videos: this.client.videos
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
