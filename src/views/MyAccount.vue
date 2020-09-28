<template>
  <div class="text-left text-on-background text-opacity-high" v-if="tenant">
    <!-- header -->
    <BaseHeroSection>
      <img class="h-12 rounded-full" :src="logoUrl" alt="user-logo" />
      <h3 class="py-6 tg-h2-mobile text-on-background">
        {{ tenant.name }}
      </h3>
    </BaseHeroSection>

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
import BaseHeroSection from '@/components/BaseHeroSection.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import MediaManager from '@/components/uploader/MediaManager.vue';
import { mapActions } from 'vuex';
import { get } from 'lodash-es';
import IconCreate from '@/assets/icons/create.svg';
import IconPerson from '@/assets/icons/person.svg';
import DropDownSheet from '@/components/tenant/DropDownSheet.vue';

export default {
  name: 'MyAccount',
  components: {
    DropDownSheet,
    BaseHeroSection,
    IconCreate,
    ExpansionPanel,
    MediaManager,
    IconPerson
  },
  data() {
    return {
      tenants: [],
      tenant: null,
      tenantData: null,
      logoUrl:
        'https://res.cloudinary.com/whynotearth/image/upload/v1600846670/BrowTricks/static_v2/logo-round-wbg_oo659o.png'
    };
  },
  computed: {
    currentFiles() {
      return [
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
    ...mapActions('tenant', ['fetchUserTenant', 'fetchUserTenants']),
    ...mapActions('auth', ['logout']),
    ...mapActions('loading', ['loadingUpdate']),
    async init() {
      this.loadingUpdate(true);
      await this._fetchUserTenant();
      this.loadingUpdate(false);
    },
    async _fetchUserTenant() {
      this.tenantData = await this.fetchUserTenant({
        params: {
          tenantSlug: this.$route.params.tenantSlug
        }
      }).catch(() => {
        console.log('error in getting mytenants');
      });

      // TODO: use fetchUserTenant when api was ready
      await this.fetchUserTenants().then(tenants => {
        this.tenants = tenants;
        this.tenant = tenants.find(
          item => item.slug === this.$route.params.tenantSlug
        );
      });
    }
  },
  watch: {
    '$route.params.tenantSlug'(newValue) {
      console.log('watch tenantSlug', newValue);
      if (newValue) {
        this.init();
      }
    }
  }
};
</script>
