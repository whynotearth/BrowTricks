<template>
  <div>
    <BaseOverlayPage :isOpen="isOpen" @close="close" title="Select Client">
      <div class="mb-1" v-if="clients.length > 0">
        <div class="" v-for="(client, key) in clients" :key="key">
          <h6
            v-if="showLetter(clients[key - 1], client)"
            class="p-3 tg-caption-mobile text-on-background text-opacity-high border-t"
          >
            {{ client.firstName && client.firstName[0].toUpperCase() }}
          </h6>

          <ClientListItem
            :key="client.id"
            :client="client"
            @select="onSelectClient(client)"
          />
        </div>
      </div>
    </BaseOverlayPage>
  </div>
</template>

<script>
import ClientListItem from '@/components/client/ClientListItem';
import BaseOverlayPage from '@/components/BaseOverlayPage';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'ClientSelectOverlay',
  components: { ClientListItem, BaseOverlayPage },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    tenantSlug: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions('client', ['fetchClients']),
    onSelectClient(client) {
      this.$emit('select', client);
      this.close();
    },
    close() {
      this.$emit('close');
    },
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
