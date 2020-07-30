<template>
  <ClassicLayout class="bg-newbackground text-white">
    <template #header>
      <BaseHeader>
        <template #end>
          <div class="flex w-full justify-end">
            <router-link
              :to="{ name: 'Login' }"
              class="uppercase text-newsecondary"
            >
              Log In
            </router-link>
          </div>
        </template>
      </BaseHeader>
    </template>
    <template #content>
      <div class="p-6 pb-20">
        <img
          class="mx-auto block"
          src="https://res.cloudinary.com/whynotearth/image/upload/v1596130890/BrowTricks/static_v2/logo-light_yioxuj.png"
          alt=""
        />

        <div class="tg-h2-mobile mb-4">{{ tenantName }}</div>
        <div class="tg-body-mobile mb-4">
          {{ promoText }}
        </div>
        <div class="w-full px-3">
          <BaseButton class="border border-solid">
            <IconCalendar slot="icon" class="fill-current h-6 w-6" />
            <span slot="cta-text">Book Now</span>
          </BaseButton>
        </div>
        <BaseLineItem class="my-4">
          <template #title>
            Paul Chris Luke
          </template>
          <template #subtitle>
            <span class="text-opacity-medium">
              Microblading
            </span>
          </template>
          <template #description>
            <span class="text-opacity-medium">
              Feb 12, 2020 - 5:00PM
            </span>
          </template>
          <template #detail>
            <span class="text-opacity-medium">
              $100
            </span>
          </template>
        </BaseLineItem>
      </div>
    </template>
  </ClassicLayout>
</template>

<script>
import ClassicLayout from '@/layouts/ClassicLayout.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import IconMenu from '@/assets/icons/menu.svg';
import CustomerMenuDrawer from '@/components/CustomerMenuDrawer.vue';
import BaseButton from '@/components/BaseButton.vue';
import IconCalendar from '@/assets/icons/calendar_today.svg';
import BaseLineItem from '@/components/BaseLineItem.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Home',
  components: {
    ClassicLayout,
    BaseHeader,
    IconMenu,
    CustomerMenuDrawer,
    BaseButton,
    IconCalendar,
    BaseLineItem
  },
  props: {
    promoText: {
      type: String,
      default: 'Lucky you! Our promo has 12 spots left! Book now for 20% off!'
    }
  },
  computed: {
    ...mapGetters({
      tenantName: 'getTenantName'
    })
  },
  methods: {
    ...mapMutations(['toggleMenuDrawer'])
  }
};
</script>
