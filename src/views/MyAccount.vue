<template>
  <PageContentBoard>
    <div class="text-left text-on-background text-opacity-high" v-if="tenant">
      <!-- header -->
      <HeaderHeroSection class="bg-pattern pb-16">
        <div class="account-owner">
          <BaseAvatar :image="avatar" />
          <h2 class="py-4 tg-h2-mobile text-on-background text-center">
            {{ tenant.name }}
          </h2>
        </div>

        <div class="w-full">
          <!-- <ExpansionPanel title="Edit Account" disabled>
            <template #preIcon>
              <IconCreate class="w-4 h-4 fill-current" />
            </template>
          </ExpansionPanel> -->

          <ExpansionPanel title="Log Out" @click="logout">
            <template #preIcon>
              <IconPerson class="w-4 h-4 fill-current" />
            </template>
          </ExpansionPanel>
        </div>
      </HeaderHeroSection>

      <!-- content -->
      <!-- @click="
          $router.push({
            name: 'AccountInfoEdit',
            params: { tenant: tenant }
          })
        " -->
      <div class="-mt-8">
        <div class="max-w-md px-4 mx-auto">
          <MediaManager :files="currentFiles" class="mb-4">
            <template #title>
              <div class="tg-body-mobile ">
                <span class="text-on-background text-opacity-high"></span>
              </div>
            </template>
          </MediaManager>
        </div>
      </div>

      <portal to="SwitcherBar">
        <DropDownSheet :tenants="tenants" />
      </portal>
    </div>
  </PageContentBoard>
</template>

<script>
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import PageContentBoard from '@/components/PageContentBoard.vue';
import HeaderHeroSection from '@/components/HeaderHeroSection.vue';
import MediaManager from '@/components/uploader/MediaManager.vue';
import { mapActions } from 'vuex';
import { get } from 'lodash-es';
// import IconCreate from '@/assets/icons/create.svg';
import IconPerson from '@/assets/icons/person.svg';
import DropDownSheet from '@/components/tenant/DropDownSheet.vue';
import BaseAvatar from '@/components/BaseAvatar.vue';

export default {
  name: 'MyAccount',
  components: {
    PageContentBoard,
    HeaderHeroSection,
    BaseAvatar,
    DropDownSheet,
    // IconCreate,
    ExpansionPanel,
    MediaManager,
    IconPerson
  },
  data() {
    return {
      tenants: [],
      tenantData: {},
      logoUrl:
        'https://res.cloudinary.com/whynotearth/image/upload/v1601297685/BrowTricks/static_v2/pattern_zjdihx.jpg'
    };
  },
  computed: {
    avatar() {
      return process.env.VUE_APP_LOGO2_URL;
    },
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
      return this.fetchTenant({
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
      return this.fetchUserTenants({
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
