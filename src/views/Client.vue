<template>
  <div class="bg-background text-left" v-if="client">
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
    this.handleLoginByToken();
    this._fetchClient();
  },
  methods: {
    ...mapActions('auth', ['updateToken']),
    ...mapMutations('loading', ['loading']),
    ...mapActions('client', ['fetchClient']),
    handleLoginByToken() {
      this.setTokenFromUrl();
    },
    setTokenFromUrl() {
      if (this.$route.query.token) {
        this.updateToken(this.$route.query.token);
        return true;
      }
      return false;
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
