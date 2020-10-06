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
    ...mapGetters('auth', ['isAuthenticated', 'isPhoneNumberConfirmedGet'])
  },
  created() {
    const gotToken = this.setTokenFromUrl();
    if (!(gotToken || this.isAuthenticated)) {
      alert('Authentication problem occured.');
      return;
    }
    this.init();
  },
  methods: {
    ...mapActions('global', ['isDrawerOpenAuthUpdate']),
    ...mapActions('tenant', ['fetchUserTenants']),
    ...mapActions('auth', ['updateToken']),
    ...mapActions('loading', ['loadingUpdate']),
    async init() {
      if (!this.isPhoneNumberConfirmedGet) {
        this.goNumberVerification();
        return;
      }

      this.loadingUpdate(true);
      await this.handleTenantRedirect();
      this.loadingUpdate(false);
    },
    handleTenantRedirect() {
      return this.fetchUserTenants()
        .then(this.onGetTenants)
        .catch(error => {
          console.log(error);
          alert(
            `Something went wrong in getting your account data, refreshing page may help. Otherwise please contact ${process.env.VUE_APP_ADMINISTRATOR_CONTACT_EMAIL}`
          );
        });
    },
    async onGetTenants(tenants) {
      this.tenants = tenants;

      const selectedTenant = tenants[0];
      if (!selectedTenant) {
        this.goTenantSignup();
        return;
      }
      this.onDetectTenant(selectedTenant);
    },
    goTenantSignup() {
      this.$router.replace({
        name: 'TenantSignup',
        params: { step: 'business-info' }
      });
    },
    async onDetectTenant(tenant) {
      this.goTenantHome(tenant);
    },
    goTenantHome(tenant) {
      this.$router.replace({
        name: 'TenantHome',
        params: { tenantSlug: tenant.slug }
      });
    },
    goNumberVerification() {
      this.$router.replace({
        name: 'AuthNumberVerify'
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
