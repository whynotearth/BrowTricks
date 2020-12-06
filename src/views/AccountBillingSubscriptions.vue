<template>
  <div class="max-w-md w-full mx-auto pt-6 px-4 text-left">
    <BaseCard
      className="flex flex-col tg-body-mobile text-on-background text-opacity-medium"
    >
      <div class="flex justify-between w-full">
        <div class="flex flex-col">
          <div class="mb-1 text-on-background text-opacity-high">$5/month</div>
          <p class="tg-caption-mobile">Standard Subscription</p>
        </div>
        <div class="flex flex-col text-right">
          <span
            class="tg-caption-mobile mb-1 text-on-background text-opacity-high"
            >$100</span
          >
          <a
            @click.stop="planUpdate"
            class="uppercase text-brand10 cursor-pointer tg-color-label-mobile"
            >Manage</a
          >
        </div>
      </div>

      <hr class="my-4" />

      <div
        class="flex justify-between w-full py-2"
        v-for="info in planInfo"
        :key="info.k"
      >
        <p>
          {{ info.k }}
        </p>
        <div class="tg-body-bold-mobile text-on-background text-opacity-high">
          {{ info.v }}
        </div>
      </div>

      <div class="flex justify-between w-full py-2">
        <p>Coupon Code</p>
        <a
          @click.stop="couponAdd"
          class="uppercase text-brand10 cursor-pointer tg-color-label-mobile"
          >Add Coupon</a
        >
      </div>
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard';
export default {
  name: 'AccountBillingSubscriptions',
  components: { BaseCard },
  computed: {
    planInfo() {
      return [
        { k: 'Subscription Status', v: 'Active' },
        { k: 'Payments', v: 'Automatic' },
        { k: 'Last Payment Date', v: '28 May, 2020' },
        { k: 'Last Payment Amount', v: '$10.00' }
      ];
    }
  },
  methods: {
    planUpdate() {
      console.log('planUpdate...');
    },
    couponAdd() {
      console.log('couponAdd...');
    }
  }
};
</script>
