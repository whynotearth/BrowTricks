<template>
  <div class="customer-view">
    <LayoutFixedScrollable>
      <BaseHeader
        slot="header"
        class="text-on-background-image"
        @iconClicked="toggleMenuDrawer"
      >
        <IconMenu slot="icon" class="h-6 w-6 fill-current" />
        <CustomerMenuDrawer slot="menu-drawer" />
      </BaseHeader>
      <div slot="content" class="p-6 pb-20 mt-auto text-on-background-image">
        <div class="tg-h2-mobile mb-4">{{ tenantName }}</div>
        <div class="tg-body-mobile mb-4">
          {{ promoText }}
        </div>
        <div class="w-full px-3">
          <BaseButton class="border border-solid">
            <IconCalendar slot="icon" class="fill-current" />
            <span slot="cta-text">Book Now</span>
          </BaseButton>
        </div>
        <BaseLineItem class="my-4">
          <template #title>
            Paul Chris Luke
          </template>
          <template #subtitle>
            <span class="text-on-background-image text-opacity-medium">
              Microblading
            </span>
          </template>
          <template #description>
            <span class="text-on-background-image text-opacity-medium">
              Feb 12, 2020 - 5:00PM
            </span>
          </template>
          <template #detail>
            <span class="text-on-background-image text-opacity-medium">
              $100
            </span>
          </template>
        </BaseLineItem>
      </div>
    </LayoutFixedScrollable>
  </div>
</template>

<script>
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import IconMenu from '@/assets/icons/menu.svg';
import CustomerMenuDrawer from '@/components/CustomerMenuDrawer.vue';
import BaseButton from '@/components/BaseButton.vue';
import IconCalendar from '@/assets/icons/calendar_today.svg';
import BaseLineItem from '@/components/BaseLineItem.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'CustomerHome',
  components: {
    LayoutFixedScrollable,
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
