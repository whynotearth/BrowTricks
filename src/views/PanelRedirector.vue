<template>
  <div></div>
</template>

<script>
/**

Signup:
  Google Auth, then:
    firstname, lastname, phone, username => continueToApp
  Standard:
    firstname, lastname, phone, email, username, password => continueToApp

Login:
  Google Auth, then:
    is user: => continueToApp
    is not user => Signup.Google
  Standard:
    username/email, password => continueToApp

Forgot password:
  email/username

continueToApp = verify email? => verify phone? => create tenant? => dashboard

 */

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PanelRedirector',
  data() {
    return {
      tenants: [],
      profile: null
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  async created() {
    const gotToken = this.setTokenFromUrl();

    await this.ping().catch(() => {
      console.log('Ping failed');
    });
    if (!gotToken && !this.isAuthenticated) {
      console.log('!token !authenticated');
      this.goLogin();
      return;
    }
    this.init();
  },
  methods: {
    ...mapActions('global', ['isDrawerOpenAuthUpdate']),
    ...mapActions('tenant', ['fetchUserTenants']),
    ...mapActions('auth', ['updateToken', 'ping']),
    ...mapActions('profile', ['profileFetch']),
    ...mapActions('loading', ['loadingUpdate']),
    async init() {
      await this._profileFetch();
      if (!this.profile) {
        alert('Something went wrong. Refreshing page may fix the issue.');
        return;
      }

      if (!this.isProfileComplete()) {
        console.log('!isProfileComplete');
        this.goSignupEdit();
        return;
      }

      if (!this.profile.isEmailConfirmed) {
        console.log('!isEmailConfirmed...');
        this.goEmailVerification();
        return;
      }

      if (!this.profile.isPhoneNumberConfirmed) {
        console.log('!isEmailConfirmed...');
        this.goNumberVerification();
        return;
      }

      this.loadingUpdate(true);
      await this.handleTenantRedirect();
      this.loadingUpdate(false);
    },

    async _profileFetch() {
      this.loadingUpdate(true);
      await this.profileFetch()
        .then(response => {
          this.profile = response;
        })
        .catch(() => {
          console.log('Error in get profile');
        });
      this.loadingUpdate(false);
    },

    isProfileComplete() {
      return (
        this.profile.firstName &&
        this.profile.lastName &&
        this.profile.phoneNumber &&
        this.profile.email
      );
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
      this.goTenantHome(selectedTenant);
    },
    goTenantSignup() {
      this.$router.replace({
        name: 'TenantSignup',
        params: { step: 'business-info' }
      });
    },
    goTenantHome(tenant) {
      this.$router.replace({
        name: 'TenantHome',
        params: { tenantSlug: tenant.slug }
      });
    },
    goSignupEdit() {
      this.$router.replace({
        name: 'AuthSignupEdit'
      });
    },
    goEmailVerification() {
      this.$router.replace({
        name: 'AuthEmailVerify',
        query: { email: this.profile.email }
      });
    },
    goNumberVerification() {
      this.$router.replace({
        name: 'AuthNumberVerify'
      });
    },
    goLogin() {
      this.$router.replace({
        name: 'AuthLogin'
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
