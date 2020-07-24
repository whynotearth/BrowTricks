<template>
  <div class="bg-background text-left min-h-screen">
    <BaseHeader
      slot="header"
      class="bg-footer text-white"
      @iconClicked="goBack"
    >
      <ArrowBack slot="icon" class="h-6 w-6 fill-current" />
      <span slot="content" class="pl-5">Images</span>
    </BaseHeader>
    <div class="mt-8">
      <ImageUpload
        v-model="images"
        :defaultImages="clientInfo.images ? clientInfo.images : []"
      >
        <template #title>
          <div class="tg-body-mobile ">
            <span class="text-on-background text-opacity-high"> Images </span>
            <span class="text-on-background text-opacity-medium">
              ( 500 x 600 pixels JPEG / PNG )
            </span>
          </div>
        </template>
      </ImageUpload>
    </div>
    <div class="mt-4 mx-4 py-6 px-2">
      <Button
        v-if="getButtonInfo"
        class="rounded-full"
        :href="getButtonInfo.href"
        :title="getButtonInfo.title"
        :isRipple="false"
      />
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
  name: 'ClientNotifications',
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
      images: null
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
          title: `Request by email ${this.clientInfo.email}`
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
    }
  },
  destroyed() {
    this.resetClientInfo();
  }
};
</script>
