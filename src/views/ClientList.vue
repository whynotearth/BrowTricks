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
          <ClientListItem />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ClientListItem from '@/components/client/ClientListItem';

export default {
  name: 'ClientList',
  components: {
    ClientListItem
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
