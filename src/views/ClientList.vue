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
    <div v-if="clients.length > 0">
      <div class="border-b" v-for="(client, key) in clients" :key="key">
        <h6
          v-if="
            key === 0
              ? true
              : client.firstName[0].toUpperCase() !=
                clients[key - 1].firstName[0].toUpperCase()
          "
          class="p-3 tg-caption-mobile text-on-background text-opacity-high"
        >
          {{ client.firstName[0].toUpperCase() }}
        </h6>

        <router-link
          :to="{
            name: 'ClientDetail',
            params: { slug: tenantSlug, clientId: client.id }
          }"
        >
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
        </router-link>
      </div>
    </div>
    <div v-else>
      <div
        class="layout-splash absolute inset-0 min-h-screen w-full flex flex-col justify-end sm:justify-center items-center py-20"
      >
        <div class="pb-20 sm:py-16 flex flex-col items-center">
          <div class="py-3">
            <UsersGroupIcon />
          </div>
        </div>
        <div class="sm:py-10 w-full md:w-auto px-5">
          <h1
            class="py-3 tg-h1-mobile text-white text-opacity-high text-center"
          >
            Manage Your Clients
          </h1>
          <h4
            class="py-6 tg-body-mobile text-white text-opacity-high text-center"
          >
            Access your client’s information, photos, and agreements here.
          </h4>
          <Button
            :to="{
              name: 'AddClient',
              params: { tenantSlug, step: 'basic-info' }
            }"
            title="ADD NEW CLIENTS"
            class="tg-color-label-mobile text-white text-opacity-high rounded-full py-3 px-10"
          >
            <template #icon>
              <AddIcon class="md:mr-5" />
            </template>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import BaseHeader from '@/components/BaseHeader.vue';
import Button from '@/components/Button.vue';
import ArrowBack from '@/assets/icons/arrow-back.svg';
import AddIcon from '@/assets/icons/new_item.svg';
import UsersGroupIcon from '@/assets/icons/users-group.svg';

export default {
  name: 'ClientList',
  components: {
    BaseHeader,
    ArrowBack,
    Button,
    AddIcon,
    UsersGroupIcon
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
