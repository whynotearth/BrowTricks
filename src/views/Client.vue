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
    ...mapGetters('loading', ['loadingGet']),
    ...mapGetters('auth', ['isAuthenticated'])
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
        const status = get(error, 'response.status', null);
        const shouldCare = status === 401 && !this.isAuthenticated;
        console.log('Invalid login token');
        if (shouldCare) {
          this.errorMessage = get(
            error,
            'response.data.error',
            'This link is not valid.'
          );
        }
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
        .catch(error => {
          console.log('Error in getting client');
          const status = get(error, 'response.status', null);
          if (!this.errorMessage) {
            if (status === 401) {
              this.errorMessage = 'Sorry, this link is not valid.';
            } else {
              this.errorMessage =
                'Could not get client data. If problem persisted please contact chris@whynot.earth';
            }
          }
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
