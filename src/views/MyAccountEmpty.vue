<template>
  <!-- This is where we handle redirect to a tenant account or show empty state -->
  <div class="text-left text-on-background text-opacity-high">
    <div class="max-w-md mx-auto text-center pt-6 px-4">
      <template v-if="isAuthenticated">
        <p class="tg-body-mobile text-on-background text-opacity-high mb-4">
          You need to create an account
        </p>

        <Button
          @clicked="addAccount"
          :isRounded="true"
          title="Add Account"
          theme="btnprimary"
        />
      </template>

      <template v-else>
        <p class="tg-body-mobile text-on-background text-opacity-high mb-4">
          You need to signup and create an account
        </p>

        <Button
          @clicked="isDrawerOpenAuthUpdate(true)"
          :isRounded="true"
          title="Sign Up"
          theme="btnprimary"
        />
      </template>
    </div>

    <portal to="SwitcherBar">
      <DropDownSheet :tenants="tenants" />
    </portal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DropDownSheet from '@/components/tenant/DropDownSheet.vue';

export default {
  name: 'MyAccountEmpty',
  components: { DropDownSheet },
  data() {
    return {
      tenants: [],
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
        this.handleSignup();
        return;
      }
      await this.$router.replace({
        name: 'MyAccount',
        params: { tenantSlug: selectedTenant.slug }
      });
      this.loadingUpdate(false);
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
