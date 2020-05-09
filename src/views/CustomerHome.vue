<template>
  <LayoutFixedScrollable>
    <BaseMenuHeader slot="header" />
    <div slot="content" class="p-6 pb-20 mt-auto text-on-background-image">
      <div class="tg-h2-mobile mb-4">{{ tenantName }}</div>
      <div class="tg-body-mobile mb-4">
        {{ promoText }}
      </div>
      <div class="w-full px-3">
        <Button class="border border-solid">
          <CalendarIcon slot="icon" class="fill-current" />
          <span slot="cta-text">Book Now</span>
        </Button>
      </div>
    </div>
  </LayoutFixedScrollable>
</template>

<script>
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import BaseMenuHeader from '@/components/BaseMenuHeader.vue';
import Button from '@/components/BaseButton.vue';
import CalendarIcon from '@/assets/icons/calendar_today.svg';
import { mapGetters } from 'vuex';

export default {
  name: 'CustomerHome',
  components: {
    LayoutFixedScrollable,
    BaseMenuHeader,
    Button,
    CalendarIcon
  },
  props: {
    tenantName: {
      type: String,
      default: 'Boise Brow Queen'
    },
    promoText: {
      type: String,
      default: 'Lucky you! Our promo has 12 spots left! Book now for 20% off!'
    }
  },
  computed: {
    ...mapGetters(['isMenuDrawerOpen'])
  }
};
</script>

<style>
/* temporary css to simulate background until actual background is provided by product */

html:before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.75;
  background-image: url('https://i.pinimg.com/originals/80/29/6b/80296b1e27351233d5d82104b3e02a92.jpg');
  background-repeat: no-repeat;
  background-position: 50% 0;
  -ms-background-size: cover;
  -o-background-size: cover;
  -moz-background-size: cover;
  -webkit-background-size: cover;
  background-size: cover;
}
</style>
