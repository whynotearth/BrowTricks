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
        <h6 v-if="client.firstName[0].toUpperCase() !== lastCharacter" class="p-3 tg-caption-mobile text-on-background text-opacity-high">
          {{ client.firstName[0].toUpperCase() }}
        </h6>
        <div class="hidden">{{ lastCharacter = client.firstName[0].toUpperCase() }}</div>
        <div class="px-4 pb-4 flex items-center">
          <img
            class="w-10 h-10 rounded-full"
            src="https://s3-alpha-sig.figma.com/img/d070/3253/4a949f321c0c57ce561f6b64e3aefaa6?Expires=1595808000&Signature=EOxOhD2BpqVyUnltYtStBbtxwQZ2WpLSNGG13u6EO5ngMG7Fv1wM1huk-vePD2YXJGWgJPl3OVnPTRnIyT31QZtu~MVzE-oK8dP6eHc9jXYZNkPSquCiTpOqIa4e9pHGGWP9peUKA9iOykdnHjiHPOHJvpeHoT3n03ff0rlr05EaWGx7EcKvhJv1Tpj2KacVWtwG8DWmsgTbz6o9384X-7HTGy5FK5rDA4FwT5DxqEZfNcX34xSZIDfygIQclkzNgIUs-98hwbE9YJA9oAOilWaoacqvdXvV~YKCQPCwfgpMH0M18BFN2wo6v1eYzJ3m6yO7azW1sw5sXcd7QDEGOw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt="user-logo"
          />
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
    <div v-else>
      <div
        class="layout-splash absolute inset-0 min-h-screen w-full flex flex-col justify-end sm:justify-center items-center py-20"
      >
        <div class="sm:py-16 flex flex-col items-center">
          <div class="py-3">
            <img height="450" width="225" :src="logoUrl" alt="clients-logo" />
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
import ArrowBack from '@/assets/icons/arrow_back.svg';
import AddIcon from '@/assets/icons/new_item.svg';

export default {
  name: 'ClientList',
  components: {
    BaseHeader,
    ArrowBack,
    Button,
    AddIcon
  },
  props: {
    tenantSlug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      lastCharacter: null,
      client: false,
      logoUrl:
        'https://s3-alpha-sig.figma.com/img/9ae4/25d3/f4970958de9560957aa38fb9ad00c57d?Expires=1595808000&Signature=A3fe-i50L5faBbq5FjyHWWP~jHFKj9pJmJIca~vuFOSxRYKt3wY-6loRE6cmS9O4M8pTZQoymgQNY4xIMtEWUyAxn9Fw3OpLevQCnOa4krCkXszvG6j7ls~-9qrW-V5sSu0kmwNfZi1X0OR~Rnl3SYPT9Gravc6VSIMRg1iPdAULpEzuKomWkY2ODhj-jzxPcyjZTtZUNbCe~wJaZN32ho~0oNnyAv5U5ECy9T60qqW0W9ONrrtmkuhQ8EY5J306x~3sJpI9zLbogOfDSZufMXc5ecN4ws7icerZyd4VODUweXQGTR8uet8nt2Vo381Gi17eGfnc1klUnpIPmRxKUw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'
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
