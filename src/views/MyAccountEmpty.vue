<template>
  <!-- This is where we handle redirect to a tenant account or show empty state -->
  <div class="text-left text-on-background text-opacity-high">
    <div class="max-w-md mx-auto text-center pt-6 px-4">
      <p class="tg-body-mobile text-on-background text-opacity-high mb-4">
        You need to create an account
      </p>

      <Button
        :isRounded="true"
        title="Add Account"
        theme="btnprimary"
        @clicked="addAccount"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Button from '@/components/inputs/Button';

export default {
  name: 'MyAccountEmpty',
  components: { Button },
  data() {
    return {
      tenant: null,
      tenantData: null
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
    ...mapActions('tenant', ['fetchUserTenants']),
    ...mapActions('auth', ['updateToken']),
    ...mapMutations('loading', ['loading']),
    init() {
      this.loading(true);

      this.fetchUserTenants()
        .then(tenants => {
          this.handleRedirect(tenants);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading(false);
        });
    },
    handleRedirect(tenants) {
      const selectedTenant = tenants[0];
      if (!selectedTenant) {
        this.handleSignup();
        return;
      }
      this.$router.replace({
        name: 'MyAccount',
        params: { tenantSlug: selectedTenant.slug }
      });
    },
    handleSignup() {
      const shouldSignup = this.$route.query.signup === '1';
      console.log('TODO: shouldSignup', shouldSignup);
      if (shouldSignup) {
        this.addAccount();
      }
    },
    addAccount() {
      this.$router.push({
        name: 'SignUp',
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
