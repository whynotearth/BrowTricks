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

          <router-link :to="{ name: 'AuthLogout' }">
            <ExpansionPanel title="Log Out">
              <template #preIcon>
                <IconPerson class="w-4 h-4 fill-current" />
              </template>
            </ExpansionPanel>
          </router-link>
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
          <MediaManager
            @deleteItem="deleteItem"
            :files="currentFiles"
            class="mb-4"
          >
            <template #uploadButton>
              <a
                tabindex="0"
                class="upload-add bg-surface border-brand2 border border-opacity-medium flex justify-center items-center p-4 cursor-pointer"
                aria-label="Upload"
                @click="_openDrawerUploadUpdate"
              >
                <IconCamera
                  class="fill-current text-primary text-opacity-high w-10 h-10"
                />
              </a>
            </template>
          </MediaManager>
        </div>
      </div>

      <portal to="SwitcherBar">
        <DropDownSheet :tenants="tenants" />
      </portal>

      <portal to="HeaderAction">
        <router-link
          class="tg-color-label-mobile block py-1 px-2"
          :to="{ name: 'AccountSettings' }"
          title="Settings"
        >
          <IconGear class="text-background text-opacity-high fill-current" />
        </router-link>
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
import IconCamera from '@/assets/icons/camera.svg';
import IconGear from '@/assets/icons/gear.svg';
import { UploaderTypes } from '@/services/uploader';

export default {
  name: 'Account',
  components: {
    PageContentBoard,
    HeaderHeroSection,
    BaseAvatar,
    DropDownSheet,
    // IconCreate,
    ExpansionPanel,
    MediaManager,
    IconPerson,
    IconGear,
    IconCamera
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
    ...mapActions('loading', ['loadingUpdate']),
    ...mapActions('client', [
      'updateClient',
      'archiveClient',
      'fetchClient',
      'imageDelete',
      'videoDelete'
    ]),
    ...mapActions('uploader', ['openDrawerUploadUpdate']),
    _openDrawerUploadUpdate() {
      this.openDrawerUploadUpdate(UploaderTypes.CLIENT);
    },
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
    },
    deleteItem({ id, resourceType }) {
      /* eslint-disable */
      const method =
        resourceType === 'image'
          ? this.imageDelete
          : resourceType === 'video'
          ? this.videoDelete
          : null;
      /* eslint-enable */
      if (!method) {
        console.log('Unknown resource type.');
      }
      method({
        params: {
          tenantSlug: this.tenantSlug,
          [`${resourceType}Id`]: id
        }
      }).then(this._fetchTenant);
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
