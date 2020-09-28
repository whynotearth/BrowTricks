<template>
  <div></div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PanelRedirector',
  data() {
    return {
      tenants: []
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  created() {
    const gotToken = this.setTokenFromUrl();
    if (!(gotToken || this.isAuthenticated)) {
      return;
    }

    this.init();
  },
  methods: {
    ...mapActions('global', ['isDrawerOpenAuthUpdate']),
    ...mapActions('tenant', ['fetchUserTenants']),
    ...mapActions('auth', ['updateToken']),
    ...mapActions('loading', ['loadingUpdate']),
    init() {
      this.loadingUpdate(true);

      this.fetchUserTenants()
        .then(tenants => {
          this.tenants = tenants;
          this.handleRedirect(tenants);
        })
        .catch(error => {
          console.log(error);
          alert(
            `Something went wrong in getting your account data, refreshing page may help. Otherwise please contact ${process.env.VUE_APP_ADMINISTRATOR_CONTACT_EMAIL}`
          );
          this.loadingUpdate(false);
        });
    },
    async handleRedirect(tenants) {
      const selectedTenant = tenants[0];
      if (!selectedTenant) {
        this.tenantSignup();
        return;
      }
      await this.$router.replace({
        name: 'TenantHome',
        params: { tenantSlug: selectedTenant.slug }
      });
      this.loadingUpdate(false);
    },
    tenantSignup() {
      this.$router.push({
        name: 'TenantSignup',
        params: { step: 'business-info' }
      });
    },
    setTokenFromUrl() {
      if (this.$route.query.token) {
        this.updateToken(this.$route.query.token);
        return true;
      }
      return false;
    }
  }
};
</script>
