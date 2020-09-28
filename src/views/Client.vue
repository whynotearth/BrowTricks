<template>
  <div class="text-left">
    <ErrorFullScreen v-if="errorMessage">
      {{ errorMessage }}
    </ErrorFullScreen>
    <template v-else-if="client">
      <transition name="fadeslow">
        <router-view v-show="!loadingGet" :client="client" />
      </transition>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { get } from 'lodash-es';
import ErrorFullScreen from '@/components/ErrorFullScreen.vue';

export default {
  name: 'Client',
  components: { ErrorFullScreen },
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
      errorMessage: '',
      client: null
    };
  },
  computed: {
    ...mapGetters('loading', ['loadingGet'])
  },
  async created() {
    this.errorMessage = '';
    await this.handleLoginByToken();
    this._fetchClient();
  },
  methods: {
    ...mapActions('auth', ['updateToken', 'tokenlogin']),
    ...mapActions('loading', ['loadingUpdate']),
    ...mapActions('client', ['fetchClient']),
    handleLoginByToken() {
      const token = this.$route.query.token;
      if (!token) {
        return;
      }
      return this.tokenlogin({ params: { body: { token } } }).catch(error => {
        this.errorMessage = get(
          error,
          'response.data.error',
          'This link is not valid.'
        );
      });
    },
    async _fetchClient() {
      this.loadingUpdate(true);
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
          this.loadingUpdate(false);
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
