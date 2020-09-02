<template>
  <div class="bg-primary text-white text-opacity-high py-2 px-6">
    <div
      v-for="tenant in tenants"
      :key="tenant.slug"
      class="flex flex-row my-4"
    >
      <div
        class="rounded-full h-10 w-10 flex items-center justify-center bg-background"
      >
        <img :src="tenant.logoUrl" />
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
        <IconCheck />
      </div>
    </div>
    <div class="flex flex-row my-4">
      <div
        class="rounded-full h-10 w-10 flex items-center justify-center bg-medium-emphasis"
      >
        <IconAddDark />
      </div>
      <div
        class="flex flex-grow content-start items-center mx-4 cursor-pointer"
      >
        <p class="text-on-primary text-base">Add Account</p>
      </div>
      <!-- <div class="flex content-start items-center cursor-pointer">
        <IconFeatureLock />
      </div> -->
    </div>
  </div>
</template>

<script>
import IconAddDark from '@/assets/icons/add-dark.svg';
// import IconFeatureLock from '@/assets/icons/feature-lock.svg';
import IconCheck from '@/assets/icons/check.svg';

export default {
  name: 'DropDownSheet',
  components: {
    IconAddDark,
    // IconFeatureLock,
    IconCheck
  },
  props: {
    tenants: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.bg-medium-emphasis {
  background: rgba(255, 255, 255, 0.54);
}
</style>
