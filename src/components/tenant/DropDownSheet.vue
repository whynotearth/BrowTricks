<template>
  <div
    class="wrapper bg-surface text-white text-opacity-high py-2 px-6 overflow-y-auto narrow-scrollbar shadow-4dp rounded-b-xl"
  >
    <a
      v-for="tenant in tenants"
      :key="tenant.slug"
      class="flex flex-row my-4"
      @click.prevent="selectTenant(tenant)"
    >
      <div
        class="flex flex-col justify-start flex-grow mx-4 cursor-pointer text-left"
      >
        <p class="text-on-primary tg-body-mobile">{{ tenant.name }}</p>
        <p class="text-on-primary text-opacity-50 tg-caption-mobile">
          User Account
        </p>
      </div>
      <div class="flex content-start items-center cursor-pointer">
        <IconCheck
          class="fill-current text-on-surface"
          v-if="isCurrentTenant(tenant)"
        />
      </div>
    </a>
    <div class="flex flex-row my-4">
      <!-- <div
        class="rounded-full h-10 w-10 flex items-center justify-center bg-medium-emphasis"
      >
        <IconAddDark />
      </div> -->
      <div
        class="flex flex-grow content-start items-center mx-4 cursor-pointer"
      >
        <router-link
          class="text-on-primary text-opacity-high text-base"
          :to="{ name: 'TenantSignup' }"
        >
          Add Account
        </router-link>
      </div>
      <!-- <div class="flex content-start items-center cursor-pointer">
        <IconFeatureLock />
      </div> -->
    </div>
  </div>
</template>

<script>
// import IconFeatureLock from '@/assets/icons/feature-lock.svg';
import IconCheck from '@/assets/icons/check.svg';
import noPageScrollbarMixin from '@/utils/noPageScrollbarMixin.js';
import { mapActions } from 'vuex';

export default {
  name: 'DropDownSheet',
  mixins: [noPageScrollbarMixin],
  data: () => ({
    defaultLogo:
      'https://res.cloudinary.com/whynotearth/image/upload/v1599063595/BrowTricks/static_v2/default-tenant-logo_mndtrm.png'
  }),
  components: {
    // IconFeatureLock,
    IconCheck
  },
  props: {
    tenants: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions('formTemplate', ['hasAnyFormTemplates']),
    ...mapActions('loading', ['loadingUpdate']),
    isCurrentTenant(tenant) {
      return tenant.slug === this.$route.params.tenantSlug;
    },
    async selectTenant(tenant) {
      this.loadingUpdate(true);
      const hasAnyFormTemplates = await this.hasAnyFormTemplates(tenant.slug);
      if (!hasAnyFormTemplates) {
        this.goFormTemplateEmptyList(tenant);
        this.loadingUpdate(false);
        return;
      }
      this.goTenantAccount(tenant);
      this.loadingUpdate(false);
    },
    goTenantAccount(tenant) {
      this.$router.replace({
        name: 'MyAccount',
        params: { tenantSlug: tenant.slug }
      });
    },
    goFormTemplateEmptyList(tenant) {
      this.$router.replace({
        name: 'FormTemplatesListEmpty',
        params: { tenantSlug: tenant.slug }
      });
    }
  }
};
</script>

<style scoped>
.bg-medium-emphasis {
  background: rgba(255, 255, 255, 0.54);
}
.wrapper {
  max-height: calc(100 * var(--vh) - 48px - 56px - 16px);
}
</style>
