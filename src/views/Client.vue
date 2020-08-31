<template>
  <div class="text-left" v-if="client">
    <transition name="fadeslow">
      <router-view v-show="!isLoading" :client="client" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

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
  computed: {
    ...mapGetters('loading', ['isLoading'])
  },
  async created() {
    await this.handleLoginByToken();
    this._fetchClient();
  },
  methods: {
    ...mapActions('auth', ['updateToken', 'tokenlogin']),
    ...mapMutations('loading', ['loading']),
    ...mapActions('client', ['fetchClient']),
    handleLoginByToken() {
      const token = this.$route.query.token;
      if (!token) {
        return;
      }
      return this.tokenlogin({ params: { body: { token } } });
    },
    async _fetchClient() {
      this.loading(true);
      this.fetchClient({
        params: {
          clientId: this.clientId,
          tenantSlug: this.tenantSlug
        }
      })
        .then(data => {
          this.client = data;
        })
        .catch(() => {
          console.log('Error in getting client');
        })
        .finally(() => {
          this.loading(false);
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
