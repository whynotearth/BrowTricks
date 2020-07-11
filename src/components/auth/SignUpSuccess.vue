<template>
  <div
    class="layout-splash min-h-screen w-full flex flex-col justify-between md:justify-center items-center py-20"
  >
    <div class="flex flex-col items-center">
      <div class="py-3">
        <img height="450" width="225" :src="logoUrl" alt="browtricks-logo" />
      </div>
    </div>
    <div class="w-full md:w-auto px-5">
      <div class="py-3">
        <h1 class="tg-h1-mobile text-center text-white text-opacity-high">
          {{ appName }}
        </h1>
      </div>
      <div class="py-3">
        <h1 class="tg-body-mobile text-white text-center">
          This starts your 30 day free trial. On {{ date }} you will be billed
          {{ billAmount }} per month. You can cancel at any time.
        </h1>
      </div>
      <div class="py-3">
        <h1 class="tg-body-mobile text-white text-center">
          Your business is now set up! Here is your custom link:
        </h1>
      </div>
      <div class="text-center">
        <Button
          :to="url.to"
          class="hyperlink-text underline text-white text-opacity-medium normal-case"
          :title="url.title"
          background="bg-transparent"
          :isRipple="false"
        />
      </div>
      <div class="">
        <Button
          :to="{
            name: 'MenuCategoryList',
            params: { tenantSlug: $route.params.slug }
          }"
          title="ADD NEW CLIENTS"
          class="tg-color-label-mobile text-white text-opacity-high rounded-full py-3 px-10"
        >
          <template #icon>
            <AddIcon class="md:mr-5" />
          </template>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import AddIcon from '@/assets/icons/new_item.svg';
import { addDays, format } from 'date-fns';

export default {
  name: 'SignUpSuccesss',
  components: {
    Button,
    AddIcon
  },
  data() {
    return {
      logoUrl: process.env.VUE_APP_LOGO_URL,
      appName: process.env.VUE_APP_NAME,
      billAmount: `$${process.env.VUE_APP_BILL_AMOUNT}`,
      date: this.format(this.addDays(new Date(), 31), 'dd MMM, yyyy')
    };
  },
  computed: {
    url() {
      let tenantSlug = this.$route.params.slug;
      return {
        title: `https://browtricksbeauty.com/shop/${tenantSlug}`,
        to: { name: 'Shop', params: { slug: tenantSlug } }
      };
    }
  },
  methods: {
    addDays,
    format
  }
};
</script>
