<template>
  <div class="bg-background text-left min-h-screen">
    <BaseHeader
      slot="header"
      class="bg-footer text-white"
      @iconClicked="goBack"
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
          v-if="this.clientInfo.notificationTypes.includes('email')"
          class="rounded-full"
          :href="`mailto:${this.clientInfo.email}`"
          :title="`Request by email ${this.clientInfo.email}`"
        />
        <Button
          v-else-if="this.clientInfo.notificationTypes.includes('phone')"
          class="rounded-full"
          @clicked="sendRequest('SMS')"
          :title="`Request by text ${this.clientInfo.phoneNumber}`"
        />
      </div>

      <!-- uploader -->
      <ImageUpload
        v-model="images"
        :defaultImages="clientInfo.images ? clientInfo.images : []"
        @change="updateImages"
        class="mb-4"
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
import Button from '@/components/Button.vue';
import ImageUpload from '@/components/imageUpload/ImageUpload.vue';
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex';
import { sleep } from '@/helpers.js';

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
      images: []
    };
  },
  async created() {
    const client = await this.getClientById(this.clientId);
    if (client) {
      this.setClientInfo(client);
    } else {
      this.$router.push({
        name: 'ClientList',
        params: { ...this.$route.params }
      });
    }
  },
  computed: {
    ...mapGetters('client', ['getClientById']),
    ...mapState('client', ['clientInfo']),
    getButtonInfo() {
      if (this.clientInfo.notificationTypes.includes('email')) {
        return {
          href: `mailto:${this.clientInfo.email}`,
          title: `Request by text ${this.clientInfo.email}`
        };
      } else {
        return null;
      }
    }
  },
  methods: {
    ...mapMutations('client', ['setClientInfo', 'resetClientInfo']),
    ...mapActions('client', ['updateClient']),
    goBack() {
      this.$router.go(-1);
    },
    updateClientNotification() {
      this.updateClient({
        tenantSlug: this.tenantSlug,
        clientId: this.clientId,
        body: this.clientInfo
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
      console.log('images', images);
      const imagesAdapted = images.map(item => ({
        url: item.url,
        publicId: item.publicId
      }))
      const clientInfo = {
        email: this.clientInfo.email,
        images: imagesAdapted
      };
      this.updateClient({
        tenantSlug: this.tenantSlug,
        clientId: this.clientId,
        body: clientInfo
      }).catch(error => {
        console.log('Update client error', error.response);
      });
    }
  },
  destroyed() {
    this.resetClientInfo();
  }
};
</script>
