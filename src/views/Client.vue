<template>
  <div class="bg-newbackground text-left" v-if="client">
    <router-view :client="client" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Client',
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
  data() {
    return {
      client: null
    };
  },
  async created() {
    this._fetchClient();
  },
  methods: {
    ...mapActions('client', ['fetchClient']),
    async _fetchClient() {
      this.client = await this.fetchClient({
        params: {
          clientId: this.clientId,
          tenantSlug: this.tenantSlug
        }
      }).catch(() => {
        console.log('error in getting client');
      });
    }
  },
  watch: {
    $route() {
      this._fetchClient();
    }
  }
};
</script>
