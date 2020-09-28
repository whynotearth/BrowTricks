<template>
  <div class="text-left text-on-background text-opacity-high" v-if="tenant">
    <!-- header -->
    <div class="account-header">
      <BaseAvatar image="" />
      <h3 class="py-6 tg-h2-mobile text-on-background">
        {{ tenant.name }}
      </h3>
    </div>

    <!-- content -->
    <!-- @click="
          $router.push({
            name: 'AccountInfoEdit',
            params: { tenant: tenant }
          })
        " -->
    <div class="max-w-md mx-auto px-4 -mt-10">
      <ExpansionPanel title="Edit Account" disabled>
        <template #preIcon>
          <IconCreate class="h-6 w-6 fill-current" />
        </template>
      </ExpansionPanel>

      <ExpansionPanel title="Log Out" @click="logout">
        <template #preIcon>
          <IconPerson class="h-6 w-6 fill-current" />
        </template>
      </ExpansionPanel>

      <MediaManager :files="currentFiles" class="mb-4">
        <template #title>
          <div class="tg-body-mobile ">
            <span class="text-on-background text-opacity-high"></span>
          </div>
        </template>
      </MediaManager>
    </div>

    <portal to="SwitcherBar">
      <DropDownSheet :tenants="tenants" />
    </portal>
  </div>
</template>

<script>
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import MediaManager from '@/components/uploader/MediaManager.vue';
import { mapActions } from 'vuex';
import { get } from 'lodash-es';
import IconCreate from '@/assets/icons/create.svg';
import IconPerson from '@/assets/icons/person.svg';
import DropDownSheet from '@/components/tenant/DropDownSheet.vue';
import BaseAvatar from '@/components/BaseAvatar.vue';

export default {
  name: 'MyAccount',
  components: {
    BaseAvatar,
    DropDownSheet,
    IconCreate,
    ExpansionPanel,
    MediaManager,
    IconPerson
  },
  data() {
    return {
      tenants: [],
      tenantData: {}
    };
  },
  computed: {
    tenant() {
      return this.tenantData.tenant;
    },
    currentFiles() {
      return [
        // TODO: this not working now, needs API update
        ...get(this.tenantData, 'images', []).map(item => ({
          ...item,
          resourceType: 'image'
        })),
        ...get(this.tenantData, 'videos', []).map(item => ({
          ...item,
          resourceType: 'video'
        }))
      ];
    }
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions('tenant', ['fetchUserTenants', 'fetchTenant']),
    ...mapActions('auth', ['logout']),
    ...mapActions('loading', ['loadingUpdate']),
    async init() {
      this.loadingUpdate(true);
      await this._fetchTenant();
      await this._fetchUserTenants();
      this.loadingUpdate(false);
    },
    _fetchTenant() {
      this.fetchTenant({
        params: {
          tenantSlug: this.$route.params.tenantSlug
        }
      })
        .then(response => {
          this.tenantData = response;
        })
        .catch(() => {
          console.log('error in getting media');
          alert('Something went wrong, could not fetch the tenant');
        });
    },
    _fetchUserTenants() {
      this.fetchUserTenants({
        params: {
          tenantSlug: this.$route.params.tenantSlug
        }
      })
        .then(response => {
          this.tenants = response;
        })
        .catch(() => {
          console.log('error in getting mytenants');
          alert('Something went wrong, could not fetch tenants');
        });
    }
  },
  watch: {
    '$route.params.tenantSlug'(newValue) {
      console.log('Tenant changed:', newValue);
      if (newValue) {
        this.init();
      }
    }
  }
};
</script>
