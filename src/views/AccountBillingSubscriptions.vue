<template>
  <div class="max-w-md w-full mx-auto pt-6 px-4 text-left pb-32">
    <BaseCard
      className="flex flex-col tg-body-mobile text-on-background text-opacity-medium mb-6"
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
        class="flex justify-between items-center w-full py-2"
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

      <div class="flex justify-between items-center w-full py-2">
        <p>Coupon Code</p>
        <a
          @click.stop="couponAdd"
          class="uppercase text-brand10 cursor-pointer tg-color-label-mobile"
          >Add Coupon</a
        >
      </div>
    </BaseCard>

    <BaseCard
      className="flex flex-col tg-body-mobile text-on-background text-opacity-medium mb-6"
    >
      <h2 class="tg-h2-mobile mb-4">Payment Method</h2>
      <div class="flex">
        <img src="https://placehold.it/40x40" alt="" class="p-1 mr-2" />
        <div class="flex flex-col justify-between py-1">
          <p class="text-on-background text-opacity-high">Amex ****1234</p>
          <p class="tg-caption-mobile">Expires 04/21</p>
        </div>
      </div>
    </BaseCard>

    <BaseCard
      className="flex flex-col tg-body-mobile text-on-background text-opacity-medium mb-6"
    >
      <h2 class="tg-h2-mobile mb-4">Transactions</h2>
      <div
        class="flex justify-between items-center w-full py-2"
        v-for="trn in transactions"
        :key="trn.k"
      >
        <p>
          {{ trn.k }}
        </p>
        <div class="tg-body-bold-mobile text-on-background text-opacity-high">
          {{ trn.v }}
        </div>
      </div>

      <hr class="my-4" />

      <router-link
        :to="{ name: 'AccountBillingActivity' }"
        class="uppercase text-brand10 cursor-pointer tg-color-label-mobile text-center"
        >View Transactions</router-link
      >
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
    },
    transactions() {
      return [
        { k: '28 May, 2020', v: '$12.00' },
        { k: '8 May, 2020', v: '$12.00' },
        { k: '7 May, 2020', v: '$12.00' },
        { k: '28 April, 2020', v: '$12.00' }
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
