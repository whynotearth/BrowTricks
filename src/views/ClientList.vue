<template>
  <div class="bg-surface text-left min-h-screen">
    <BaseHeader
      slot="header"
      class="bg-footer text-white"
      @iconClicked="$router.push({ name: 'CustomerHome' })"
    >
      <ArrowBack slot="icon" class="h-6 w-6 fill-current" />
      <span slot="content" class="pl-5">Clients</span>
    </BaseHeader>
    <div class="mb-20" v-if="clients.length > 0">
      <div class="" v-for="(client, key) in clients" :key="key">
        <h6
          v-if="
            key === 0
              ? true
              : client.firstName &&
                clients[key - 1] &&
                clients[key - 1].firstName &&
                client.firstName[0].toUpperCase() !==
                  clients[key - 1].firstName[0].toUpperCase()
          "
          class="p-3 tg-caption-mobile text-on-background text-opacity-high border-t"
        >
          {{ client.firstName && client.firstName[0].toUpperCase() }}
        </h6>

        <div class="px-4 pb-4 flex items-center">
          <div>
            <img
              class="w-10 h-10 rounded-full"
              :src="
                client.avatarUrl ||
                  'https://res.cloudinary.com/whynotearth/image/upload/v1595228411/BrowTricks/avatar-placeholder_dphhvx.png'
              "
              alt="user-logo"
            />
          </div>
          <div class="ml-2">
            <h3 class="tg-body-mobile text-on-background text-opacity-high">
              {{ client.firstName }} {{ client.lastName }}
            </h3>
            <h4
              class="tg-caption-mobile text-on-background text-opacity-medium"
            >
              {{ client.phoneNumber }}
            </h4>
            <h4
              class="tg-caption-mobile text-on-background text-opacity-medium"
            >
              {{ client.email }}
            </h4>
          </div>
        </div>
      </div>
    </div>
    <NavigationBottom />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import BaseHeader from '@/components/BaseHeader.vue';
import ArrowBack from '@/assets/icons/arrow-back.svg';
import NavigationBottom from '@/components/BaseNavigationBottom.vue';

export default {
  name: 'ClientList',
  components: {
    BaseHeader,
    ArrowBack,
    NavigationBottom
  },
  props: {
    tenantSlug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      client: false,
      logoUrl:
        'https://res.cloudinary.com/whynotearth/image/upload/v1585738963/BrowTricks/_0003_MANAGE-CLIENTS_hl5cux.png'
    };
  },
  created() {
    this.fetchClients(this.tenantSlug);
  },
  methods: {
    ...mapActions('client', ['fetchClients'])
  },
  computed: {
    ...mapState('client', ['clients'])
  }
};
</script>

<style scoped></style>
