<template>
  <div
    class="wrapper bg-primary text-white text-opacity-high py-2 px-6 overflow-y-auto narrow-scrollbar"
  >
    <router-link
      v-for="tenant in tenants"
      :key="tenant.slug"
      class="flex flex-row my-4"
      :to="{ name: 'MyAccount', params: { tenantSlug: tenant.slug } }"
      @click.stop.native="$emit('close')"
    >
      <div
        class="rounded-full h-10 w-10 flex items-center justify-center bg-background overflow-hidden"
      >
        <img @error="tenant.logoUrl = defaultLogo" :src="tenant.logoUrl" />
      </div>
      <div
        class="flex flex-col justify-start flex-grow mx-4 cursor-pointer text-left"
      >
        <p class="text-on-primary tg-body-mobile">{{ tenant.name }}</p>
        <p class="text-on-primary text-opacity-50 tg-caption-mobile">
          User Account
        </p>
      </div>
      <div class="flex content-start items-center cursor-pointer">
        <IconCheck v-if="isCurrentTenant(tenant)" />
      </div>
    </router-link>
    <div class="flex flex-row my-4">
      <div
        class="rounded-full h-10 w-10 flex items-center justify-center bg-medium-emphasis"
      >
        <IconAddDark />
      </div>
      <div
        class="flex flex-grow content-start items-center mx-4 cursor-pointer"
      >
        <p class="text-on-primary text-opacity-disabled text-base">
          Add Account (coming soon)
        </p>
      </div>
      <div class="flex content-start items-center cursor-pointer">
        <IconFeatureLock />
      </div>
    </div>
  </div>
</template>

<script>
import IconAddDark from '@/assets/icons/add-dark.svg';
import IconFeatureLock from '@/assets/icons/feature-lock.svg';
import IconCheck from '@/assets/icons/check.svg';
import noPageScrollbarMixin from '@/utils/noPageScrollbarMixin.js';

export default {
  name: 'DropDownSheet',
  mixins: [noPageScrollbarMixin],
  data: () => ({
    defaultLogo:
      'https://res.cloudinary.com/whynotearth/image/upload/v1599063595/BrowTricks/static_v2/default-tenant-logo_mndtrm.png'
  }),
  components: {
    IconAddDark,
    IconFeatureLock,
    IconCheck
  },
  props: {
    tenants: {
      type: Array,
      required: true
    }
  },
  methods: {
    isCurrentTenant(tenant) {
      return tenant.slug === this.$route.params.tenantSlug;
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
