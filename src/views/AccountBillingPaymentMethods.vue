<template>
  <div class="max-w-md w-full mx-auto pt-6 px-4 text-left pb-32">
    <BaseCard
      v-for="paymentMethod in paymentMethods"
      :key="paymentMethod.id"
      className="flex flex-col tg-body-mobile text-on-background text-opacity-medium mb-6 pb-2"
    >
      <h2 class="tg-h2-mobile mb-4">Payment Method</h2>
      <div class="flex">
        <img src="https://placehold.it/40x40" alt="" class="p-1 mr-2" />
        <div class="flex flex-col justify-between py-1">
          <p class="text-on-background text-opacity-high">Amex ****1234</p>
          <p class="tg-caption-mobile">Expires 04/21</p>
        </div>
      </div>

      <hr class="my-2" />

      <div class="flex w-full justify-end">
        <div class="flex">
          <Button
            :width="null"
            textColor="text-error text-opacity-high"
            title="Delete"
            :background="null"
            @clicked="
              isDeleteModalOpen = true;
              activePaymentMethodId = paymentMethod.id;
            "
          />

          <Button
            :width="null"
            textColor="text-brand10 text-opacity-high"
            title="Edit"
            :background="null"
            :to="{
              name: 'AccountBillingPaymentMethodsEdit',
              params: { id: 1 }
            }"
          />
        </div>
      </div>
    </BaseCard>

    <router-link
      tabindex="0"
      class="block cursor-pointer mt-2 select-none"
      :to="{ name: 'AccountBillingPaymentMethodsAdd' }"
    >
      <div class="flex justify-between items-center px-4 py-2">
        <div
          class="text-on-background text-opacity-high tg-body-mobile uppercase"
        >
          Add Payment Method
        </div>
        <div>
          <IconAdd
            class="fill-current text-on-background text-opacity-high w-4 h-4"
          />
        </div>
      </div>
    </router-link>

    <BaseDialog
      v-if="isDeleteModalOpen"
      @close="isDeleteModalOpen = false"
      title="Delete Payment Method?"
    >
      <Button
        textColor="text-on-primary text-opacity-medium"
        title="Cancel"
        :background="null"
        @clicked="isDeleteModalOpen = false"
        width="w-auto"
        :margin="null"
      />
      <Button
        textColor="text-error"
        title="Delete"
        :background="null"
        @clicked="paymentMethodDelete"
        width="w-auto"
        :margin="null"
      />
    </BaseDialog>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard';
import IconAdd from '@/assets/icons/add.svg';
export default {
  name: 'AccountBillingPaymentMethods',
  data: () => ({
    activePaymentMethodId: null,
    isDeleteModalOpen: false
  }),
  components: { BaseCard, IconAdd },
  computed: {
    paymentMethods() {
      return [
        {
          id: 1,
          name: 'Amex',
          cardNumber: '****1234',
          expireDate: '04/21',
          image: 'https://placehold.it/40x40'
        },
        {
          id: 2,
          name: 'Amex',
          cardNumber: '****1234',
          expireDate: '04/21',
          image: 'https://placehold.it/40x40'
        }
      ];
    }
  },
  methods: {
    paymentMethodDelete() {
      console.log('delete...', this.activePaymentMethodId);
    }
  }
};
</script>

<style scoped></style>
