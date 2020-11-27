<template>
  <div>
    <StepperTop :navigation="navigation" :page="5" />
    <div v-if="!stripe" class="mx-10">
      <p>
        Your Brow tricks Beauty subscription starts as soon as you set up
        payment.
      </p>
      <p class="font-bold">No Commitments</p>
      <p class="font-bold pb-4">Cancel online anytime.</p>
      <p class="font-hairline pt-4 mx-2 text-right">Secure Server</p>
      <ExpansionPanel title="Credit or Debit Card" @click="stripe = !stripe" />
    </div>
    <div v-if="stripe" class="mx-10">
      <p>Set up your credit or debit card.</p>
      <BaseCard class="flex justify-center my-6">
        <template #header>
          <p>Stripe Card</p>
        </template>
      </BaseCard>
      <PlanSelector
        v-if="plan == true"
        v-model="selectedPlanID"
        :plans="availablePlans"
      ></PlanSelector>
      <BaseCard class="flex justify-center my-6">
        <template #content>
          <div v-if="coupon != null" class="text-left border-b-2 mb-2">
            <p class="font-hairline">First 30 Days</p>
            <span class="text-xl text-gray-700 line-through">{{
              formatter.format(selectedPlan.price)
            }}</span>
            <span class="text-xl text-gray-700">
              {{ calculateDiscount() }}
            </span>
            <p class="">{{ selectedPlan.name }} ( Code: {{ coupon.code }} )</p>
          </div>
          <div class="grid grid-cols-2">
            <div>
              <p class="text-left text-xl text-gray-700">
                {{ formatter.format(selectedPlan.price) }} / Month
              </p>
              <p class="text-left">
                {{ selectedPlan.name }}
              </p>
            </div>
            <div class="items-center">
              <Button
                @clicked="plan = !plan"
                :title="plan ? 'Cancel Change' : 'Change'"
                textColor="bg-none text-purple-600"
                theme="none"
              ></Button>
            </div>
          </div>
        </template>
        <template #footer>
          <span class="border-t-2 pt-2">
            <span v-if="error">
              {{ error }}
              <Button
                @clicked="error = ''"
                title="Ok"
                textColor="text-red-600"
                theme="none"
              ></Button>
            </span>
            <TextArea rows="1" label="Coupon Code" model="couponCode" />
            <Button
              @clicked="addCoupon"
              title="Add Coupon"
              textColor="bg-none text-purple-600"
              theme="none"
            ></Button>
          </span>
        </template>
      </BaseCard>
      <p>
        By checking the checkbox below, you agree to our Terms of Use, Privacy
        Statement, and that you are over 18. You may cancel at any time. Brow
        Tricks Beauty will automatically continue your membership and charge the
        membership fee (currently {subscription price}) to your payment method
        on a monthly basis until you cancel.
      </p>
      <Checkbox
        :inputModel="agree"
        label="I Agree"
        :checked="agree"
        @update="updateAgree"
      />
    </div>
    <StepperBottom nextStepText="Finish" :page="5" :hideNext="!agree" />
  </div>
</template>

<script>
import SubscriptionService from '@/services/subscriptions';

export default {
  name: 'SetupSubscription',
  components: {
    StepperTop: () => import('@/components/BaseStepperTopBar.vue'),
    StepperBottom: () => import('@/components/BaseStepperBottomBar.vue'),
    ExpansionPanel: () => import('@/components/ExpansionPanel.vue'),
    Button: () => import('@/components/inputs/Button.vue'),
    Checkbox: () => import('@/components/inputs/CheckBox.vue'),
    BaseCard: () => import('@/components/BaseCard.vue'),
    PlanSelector: () => import('@/components/PlanSelector.vue'),
    // PlanDetail: () => import('@/components/PlanDetail.vue'),
    TextArea: () => import('@/components/inputs/TextAreaInput.vue')
  },

  data: () => ({
    agree: false,
    stripe: false,
    plan: false,
    service: new SubscriptionService(),
    navigation: [
      {
        step: 'business-info',
        name: 'Business Info'
      },
      {
        step: 'link-account',
        name: 'Link Account'
      },
      {
        step: 'notifications',
        name: 'Notifications'
      },
      {
        step: 'business-hours',
        name: 'Business Hours'
      },
      {
        step: 'start-subscription',
        name: 'Start Subscription'
      }
    ],
    availablePlans: [],
    coupon: null,
    addingCoupon: false,
    couponCode: '',
    error: '',
    selectedPlan: null,
    // todo: move to .env
    platformDomain: 'browtricks.com',
    formatter: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }),

  methods: {
    updateAgree(consent) {
      this.agree = consent;
    },

    async addCoupon() {
      const coupon = await this.service.validateCoupon(
        this.platformDomain,
        this.couponCode
      );
      if (coupon != null) {
        this.coupon = coupon;
      }
    },

    calculateDiscount() {
      let discount = this.coupon?.discount ?? 0;
      if (this.selectedPlan && discount >= this.selectedPlan.price)
        return 'FREE';
      if (this.selectedPlan)
        return this.formatter.format(this.selectedPlan.price - discount);
    }
  },
  computed: {
    selectedPlanID() {
      return this.selectedPlan?.id;
    }
  },

  async created() {
    this.availablePlans = await this.service.getPlans(this.platformDomain);
  },

  watch: {
    selectedPlanID(newVal) {
      this.plan = false;
      this.selectedPlan = this.availablePlans.find(t => t.id == newVal) ?? null;
    }
  }
};
</script>
