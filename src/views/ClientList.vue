<template>
  <PageContentBoard>
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
            name: 'ClientInfo',
            params: { slug: tenantSlug, clientId: client.id }
          }"
        >
          <ClientListItem :client="client" />
        </router-link>
      </div>
    </div>

    <div v-else class="p-6 text-center max-w-sm mx-auto">
      <p class="tg-body-mobile text-on-background text-opacity-high mb-6">
        Add your first clients.
      </p>

      <Button
        class="mb-4"
        background="bg-brand2"
        title="Get Started"
        :to="{ name: 'ClientItemAdd' }"
      />
    </div>

    <portal to="HeaderAction">
      <router-link
        class="tg-color-label-mobile block py-1 px-2"
        :to="{
          name: 'ClientItemAdd'
        }"
        title="Add Client"
      >
        <IconEdit class="text-background text-opacity-high fill-current" />
      </router-link>
    </portal>
  </PageContentBoard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ClientListItem from '@/components/client/ClientListItem';
import PageContentBoard from '@/components/PageContentBoard';
import IconEdit from '@/assets/icons/edit.svg';

export default {
  name: 'ClientList',
  components: {
    IconEdit,
    PageContentBoard,
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
  async created() {
    this.loadingUpdate(true);
    await this.fetchClients(this.tenantSlug);
    this.loadingUpdate(false);
  },
  methods: {
    ...mapActions('loading', ['loadingUpdate']),
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
