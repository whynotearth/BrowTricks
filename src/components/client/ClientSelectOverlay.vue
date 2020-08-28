<template>
  <div>
    <BaseOverlayPage :isOpen="isOpen" @close="close" title="Select Client">
      <!-- TODO: show letter -->
      <ClientListItem
        v-for="client in clients"
        :key="client.id"
        :client="client"
        @select="onSelectClient(client)"
      />
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
    }
  },
  computed: {
    ...mapGetters('client', ['clients'])
  }
};
</script>

<style scoped></style>
