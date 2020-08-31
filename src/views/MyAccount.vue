<template>
  <div class="text-left text-on-background text-opacity-high" v-if="tenant">
    <!-- header -->
    <BaseHeroSection>
      <img class="h-12 rounded-full" :src="tenant.logoUrl" alt="user-logo" />
      <h3 class="py-6 tg-h2-mobile text-on-background">
        {{ tenant.name }}
      </h3>
    </BaseHeroSection>

    <!-- content -->
    <!-- it should be -mt-10 when expansion panel is going to uncommmented -->
    <div class="max-w-md mx-auto px-4 mt-10">
      <!-- <ExpansionPanel
        title="Edit Profile"
        @click="
          $router.push({
            name: 'AccountInfoEdit',
            params: { tenant: tenant }
          })
        "
      >
        <template #preIcon>
          <IconCreate class="h-6 w-6 fill-current" />
        </template>
      </ExpansionPanel> -->

      <MediaManager :files="currentFiles" class="mb-4">
        <template #title>
          <div class="tg-body-mobile ">
            <span class="text-on-background text-opacity-high"></span>
          </div>
        </template>
      </MediaManager>
    </div>
  </div>
</template>

<script>
import BaseHeroSection from '@/components/BaseHeroSection.vue';
// import ExpansionPanel from '@/components/ExpansionPanel.vue';
import MediaManager from '@/components/uploader/MediaManager.vue';
import { mapActions } from 'vuex';
import { get } from 'lodash-es';
// import IconCreate from '@/assets/icons/create.svg';

export default {
  name: 'MyAccount',
  components: {
    BaseHeroSection,
    // IconCreate,
    // ExpansionPanel,
    MediaManager
  },
  props: {
    tenant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tenantData: null
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
    ...mapActions('tenant', ['fetchUserTenant']),
    init() {
      this._fetchTenantData();
    },
    async _fetchTenantData() {
      this.tenantData = await this.fetchUserTenant(
        this.$route.params.tenantSlug
      ).catch(() => {
        console.log('error in getting client');
      });
    }
  }
};
</script>
