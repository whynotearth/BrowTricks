<template>
  <div class="bg-background text-left min-h-screen">
    <BaseHeader
      slot="header"
      class="bg-footer text-white"
      @iconClicked="goToDetailPage"
    >
      <template #icon>
        <ArrowBack class="h-6 w-6 fill-current" />
      </template>
      <template #content>
        <span class="pl-5">Images</span>
      </template>
    </BaseHeader>
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
            <span class="text-on-background text-opacity-high">Images</span>
          </div>
        </template>
      </ImageUpload>
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue';
import ArrowBack from '@/assets/icons/arrow-back.svg';
// import Button from '@/components/Button.vue';
import ImageUpload from '@/components/uploader/ImageUpload.vue';
import { mapGetters, mapActions } from 'vuex';
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
    BaseHeader,
    ArrowBack,
    ImageUpload
    // Button
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
    ...mapGetters('client', ['getClientById']),
    hasNotificationEmail() {
      const notificationTypes = get(this.client, 'notificationTypes', []);
      return notificationTypes.includes('email');
    },
    hasNotificationPhone() {
      const notificationTypes = get(this.client, 'notificationTypes', []);
      return notificationTypes.includes('phone');
    },
    currentImages() {
      // FIXME: REMOVE
      return [
        {
          publicId: 'BrowTricks/tenant_upload_dev/xvcygvhl2ofyy0pszqvy',
          url:
            'https://res.cloudinary.com/whynotearth/image/upload/v1596700278/BrowTricks/tenant_upload_dev/xvcygvhl2ofyy0pszqvy.jpg',
          order: 0
        },
        {
          publicId: 'BrowTricks/tenant_upload_dev/ft6egswpzqqaywoinewe',
          url:
            'https://res.cloudinary.com/whynotearth/image/upload/v1596700385/BrowTricks/tenant_upload_dev/ft6egswpzqqaywoinewe.jpg',
          order: 0
        },
        {
          publicId: 'BrowTricks/tenant_upload_dev/aeikkei69tumrolomp9i',
          url:
            'https://res.cloudinary.com/whynotearth/image/upload/v1596805609/BrowTricks/tenant_upload_dev/aeikkei69tumrolomp9i.jpg',
          order: 0
        }
      ];
      // FIXME: ENALBE
      // return get(this.client, 'images', []);
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
        // FIXME: enable
        // this.goToDetailPage();
      });
    },
    goToDetailPage() {
      this.$router.push({ name: 'ClientDetail' });
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
        email: this.client.email,
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
