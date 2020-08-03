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
      <div class="py-6 px-2 max-w-sm mx-auto">
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
      </div>

      <!-- uploader -->
      <ImageUpload :files="currentImages" @change="updateImages" class="mb-4">
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
import Button from '@/components/Button.vue';
import ImageUpload from '@/components/imageUpload/ImageUpload.vue';
import { mapGetters, mapActions } from 'vuex';
import { sleep } from '@/helpers.js';
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
    ImageUpload,
    Button
  },
  data() {
    return {
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
      this.$router.push({ name: 'ClientDetail' });
    },
    updateClientNotification() {
      this.updateClient({
        tenantSlug: this.tenantSlug,
        clientId: this.clientId,
        body: this.client
      }).then(async () => {
        this.$store.commit('overlay/updateModel', {
          title: 'Success!',
          message: 'Image uploaded successfully!'
        });
        await sleep(1500);
        this.$store.commit('overlay/updateModel', {
          title: '',
          message: ''
        });
      });
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
        images: imagesAdapted
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
