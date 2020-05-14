<template>
  <div class="customer-view">
    <LayoutFixedScrollable>
      <BaseMenuHeader slot="header" />
      <div slot="content" class="p-6 pb-20 mt-auto text-on-background-image">
        <div class="tg-h2-mobile mb-4">{{ tenantName }}</div>
        <div class="tg-body-mobile mb-4">
          {{ promoText }}
        </div>
        <div class="w-full px-3">
          <BaseButton class="border border-solid">
            <CalendarIcon slot="icon" class="fill-current" />
            <span slot="cta-text">Book Now</span>
          </BaseButton>
        </div>
      </div>
    </LayoutFixedScrollable>
  </div>
</template>

<script>
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import BaseMenuHeader from '@/components/BaseMenuHeader.vue';
import BaseButton from '@/components/BaseButton.vue';
import CalendarIcon from '@/assets/icons/calendar_today.svg';
import { mapState } from 'vuex';

export default {
  name: 'CustomerHome',
  components: {
    LayoutFixedScrollable,
    BaseMenuHeader,
    BaseButton,
    CalendarIcon
  },
  props: {
    promoText: {
      type: String,
      default: 'Lucky you! Our promo has 12 spots left! Book now for 20% off!'
    }
  },
  computed: {
    ...mapState(['tenantName'])
  }
};
</script>
