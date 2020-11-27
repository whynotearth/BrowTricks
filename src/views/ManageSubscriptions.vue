<template>
  <ClassicLayout v-if="this.subscription">
    <template #content>
      <BaseCard class="flex justify-center mt-10">
        <template #header v-if="subscription != null">
          <div>
            <!-- subscription image placeholder -->
          </div>
          <div>
            <!-- <p class="flex justify-start text-gray-800 text-md">Enterprise Subscription</p>
                        <p class="flex justify-start text-gray-600 text-sm">{{ `****${subscription.card.last4}` }}</p> -->
            <BaseCreditCard
              :text="subscription.name"
              :subtext="
                `${brand(subscription.card)} ****${subscription.card.last4}`
              "
            />
          </div>
        </template>

        <template #content>
          <span class="flex justify-between space-x-10 py-2">
            <span :class="darkText">Status</span>
            <span :class="lightText">{{ status }}</span>
          </span>
          <span class="flex justify-between space-x-10 py-2">
            <span :class="darkText">Payments</span>
            <span :class="lightText">{{
              `${subscription.renewsOnDate != '' ? 'Automatic' : 'Manual'}`
            }}</span>
          </span>
          <span class="flex justify-between space-x-10 py-2">
            <span :class="darkText">Last Payment Date</span>
            <span :class="lightText">{{
              translateDate(subscription.lastPaymentDate)
            }}</span>
          </span>
          <span class="flex justify-between space-x-10 py-2">
            <span :class="darkText">Payment Amount</span>
            <span :class="lightText">{{
              translateCurrency(subscription.lastPaymentAmount)
            }}</span>
          </span>
          <span class="flex justify-between space-x-10 py-2">
            <span :class="darkText">Renews On</span>
            <span :class="lightText">{{
              `${
                subscription.renewsOnDate != ''
                  ? translateDate(subscription.renewsOnDate)
                  : 'Never'
              }`
            }}</span>
          </span>
        </template>

        <template #footer>
          <Button
            @clicked="cancel"
            title="Cancel Subscription"
            textColor="bg-none text-red-600"
            theme="none"
          ></Button>
        </template>
      </BaseCard>

      <BaseCard v-if="!addingCard" class="flex justify-center mt-6">
        <template #header>
          <p class="flex justify-left text-md text-gray-900">Payment Method</p>
        </template>

        <template #content v-if="changingCard">
          <RadioInput
            v-for="card in paymentMethods"
            :key="card.id"
            :value="card.id"
            :selectedOption="selectedCard.id"
            @updateSelectedOption="updateCard"
            class="py-4"
          >
            <template #title>
              <BaseCreditCard
                :text="`${brand(card)} ****${card.last4}`"
                :subtext="`${card.expirationMonth}/${card.expirationYear}`"
              />
            </template>
          </RadioInput>
          <RadioInput @updateSelectedOption="addCard" class="py-4">
            <template #title>
              <span :class="darkText">Add Credit Card</span>
            </template>
          </RadioInput>
        </template>
        <template #content v-else>
          <BaseCreditCard
            v-if="selectedCard"
            :text="`${brand(selectedCard)} ****${selectedCard.last4}`"
            :subtext="
              `${selectedCard.expirationMonth}/${selectedCard.expirationYear}`
            "
          />
        </template>

        <template #footer>
          <Button
            @clicked="changeCard"
            title="Change Payment Method"
            textColor="bg-none text-blue-600"
            theme="none"
            v-if="!changingCard"
          ></Button>
          <Button
            @clicked="setCard"
            title="Save Payment Method"
            textColor="bg-none text-blue-600"
            theme="none"
            v-else
          ></Button>
        </template>
      </BaseCard>

      <BaseCard v-if="addingCard" class="flex justify-center mt-6">
        <template #header>
          <p class="flex justify-left text-md text-gray-900">Add Credit Card</p>
        </template>
        <template #content>
          <span class="flex justify-between space-x-10">
            <MaterialInput
              v-model="billingDetails.name"
              margin="mb-6 w-full"
              label="Name"
              labelBackground="has-noise bg-background"
              theme="light"
            ></MaterialInput>
          </span>
          <span class="flex justify-between space-x-10">
            <StripeCard
              class="w-full stripe-card"
              :class="{ complete }"
              :stripe="stripeKey"
              @change="complete = $event.complete"
            />
          </span>
          <span class="flex justify-between space-x-10">
            <MaterialInput
              v-model="billingDetails.address_country"
              margin="mb-6 w-full"
              label="Country"
              labelBackground="has-noise bg-background"
              theme="light"
            ></MaterialInput>
          </span>
          <span class="flex justify-between space-x-10">
            <MaterialInput
              v-model="billingDetails.address_line1"
              margin="mb-6 w-full"
              label="Billing Address"
              labelBackground="has-noise bg-background"
              theme="light"
            ></MaterialInput>
          </span>
          <span class="flex justify-between space-x-10">
            <MaterialInput
              v-model="billingDetails.address_line2"
              margin="mb-6 w-full"
              label="Apartment #"
              labelBackground="has-noise bg-background"
              theme="light"
            ></MaterialInput>
          </span>
          <span class="flex justify-between space-x-10">
            <MaterialInput
              v-model="billingDetails.address_city"
              margin="mb-6 w-full"
              label="City"
              labelBackground="has-noise bg-background"
              theme="light"
            ></MaterialInput>
          </span>
          <span class="flex justify-between space-x-10">
            <MaterialInput
              v-model="billingDetails.address_zip"
              margin="mb-6 w-full"
              label="Zip Code"
              labelBackground="has-noise bg-background"
              theme="light"
            ></MaterialInput>
          </span>
          <span class="flex justify-between space-x-10">
            <MaterialInput
              v-model="billingDetails.address_state"
              margin="mb-6 w-full"
              label="State"
              labelBackground="has-noise bg-background"
              theme="light"
            ></MaterialInput>
          </span>
        </template>
        <template #footer>
          <Button
            @clicked="saveCard"
            title="Save Card"
            textColor="bg-none text-blue-600"
            theme="none"
          ></Button>
          <Button
            @clicked="addingCard = !addingCard"
            title="Cancel"
            textColor="bg-none text-red-600"
            theme="none"
          ></Button>
        </template>
      </BaseCard>

      <BaseCard class="flex justify-center mt-6">
        <template #header>
          <p class="flex justify-left text-md text-gray-900">Transactions</p>
        </template>

        <template #content>
          <span
            class="flex justify-between space-x-10 mt-2 py-2"
            v-for="transaction in subscription.transactions"
            :key="transaction.date"
          >
            <span :class="darkText">{{ translateDate(transaction.date) }}</span>
            <span :class="lightText">{{
              translateCurrency(transaction.total)
            }}</span>
          </span>
          <span :class="darkText" v-if="subscription.transactions.length == 0"
            >No transactions found.</span
          >
        </template>

        <template #footer> </template>
      </BaseCard>
    </template>
  </ClassicLayout>
</template>

<script>
import Moment from 'moment';
import SubscriptionService, {
  Brands,
  SubscriptionStatuses
} from '@/services/subscriptions';
import { Card as StripeCard, createToken } from 'vue-stripe-elements-plus';

export default {
  name: 'manage-subscriptions',
  components: {
    ClassicLayout: () => import('@/layouts/ClassicLayout.vue'),
    BaseCard: () => import('@/components/BaseCard.vue'),
    // BaseHeader: () => import('@/components/BaseHeader.vue'),
    Button: () => import('@/components/inputs/Button.vue'),
    BaseCreditCard: () => import('@/components/BaseCreditCard.vue'),
    RadioInput: () => import('@/components/inputs/RadioInput.vue'),
    MaterialInput: () => import('@/components/inputs/MaterialInput.vue'),
    StripeCard
  },
  props: {
    tenantSlug: {
      type: String,
      required: true
    }
  },

  data: () => ({
    changingCard: false,
    addingCard: false,
    complete: false,
    darkText: 'text-gray-800 text-sm',
    lightText: 'text-gray-500 text-sm',
    service: new SubscriptionService(),
    subscription: null,
    paymentMethods: [],
    currentCard: null,
    selectedCard: null,
    stripeKey: null,
    billingDetails: {
      name: '',
      address_line1: '',
      address_line2: '',
      address_city: '',
      address_state: '',
      address_zip: '',
      address_country: ''
    }
  }),

  async mounted() {
    this.reload();
  },
  methods: {
    async saveCard() {
      var data = await createToken(this.billingDetails);
      await this.service.addPaymentMethod(this.tenantSlug, data.token.id);
      this.addingCard = false;
      this.reload();
    },
    brand(card) {
      return Brands[card.brand];
    },
    async reload() {
      if (this.tenantSlug != null) {
        this.subscription = await this.service.loadSubscriptionByTenant(
          this.tenantSlug
        );
        this.paymentMethods = await this.service.loadPaymentMethodsByTenant(
          this.tenantSlug
        );
        this.currentCard = this.subscription.card;
        this.selectedCard = this.subscription.card;
        this.stripeKey = await this.service.getPublishableKey(this.tenantSlug);
      }
    },

    translateDate(inputDate) {
      return Moment.utc(inputDate).format('D MMM, YYYY');
    },

    translateCurrency(amount) {
      let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });
      return formatter.format(amount);
    },

    cancel() {
      if (this.tenantSlug) this.service.cancelSubscription(this.tenantSlug);
    },
    changeCard() {
      this.changingCard = true;
    },
    async setCard() {
      if (this.selectedCard) {
        await this.service.changePaymentMethod(
          this.tenantSlug,
          this.selectedCard.id
        );
        this.currentCard = this.selectedCard;
        this.changingCard = false;
        this.subscription.card = this.currentCard;
      }
    },

    updateCard(cardId) {
      this.selectedCard =
        this.paymentMethods.find(p => p.id == cardId) ?? this.selectedCard;
    },

    addCard() {
      //Use this to run any Strype functions that are required.
      this.addingCard = true;
    }
  },
  computed: {
    status() {
      if (this.subscription)
        return SubscriptionStatuses[this.subscription.status];
      return 0;
    }
  }
};
</script>
<style>
.stripe-card.complete {
  border-color: green;
}
</style>
