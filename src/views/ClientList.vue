<template>
  <div class="text-left">
    <div class="mb-1" v-if="clients.length > 0">
      <div class="" v-for="(client, key) in clients" :key="key">
        <h6
          v-if="showLetter(clients[key - 1], client)"
          class="p-3 tg-caption-mobile text-on-background text-opacity-high border-t"
        >
          {{ client.firstName && client.firstName[0].toUpperCase() }}
        </h6>

        <router-link
          :to="{
            name: 'ClientEdit',
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// import ArrowBack from '@/assets/icons/arrow-back.svg';

export default {
  name: 'ClientList',
  components: {
    // ArrowBack
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
    ...mapActions('client', ['fetchClients']),
    showLetter(prev, current) {
      if (!prev) return true;

      const getPrevFirstCharacter =
        prev && prev.firstName && prev.firstName[0].toUpperCase();
      const getCurrentFirstCharacter =
        current && current.firstName && current.firstName[0].toUpperCase();

      return getPrevFirstCharacter !== getCurrentFirstCharacter;
    }
  },
  computed: {
    ...mapGetters('client', ['clients'])
  }
};
</script>

<style scoped></style>
