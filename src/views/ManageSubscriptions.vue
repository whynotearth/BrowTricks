<template>
      <ClassicLayout>
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
                            text="Enterprise Subscription"
                            :subtext="`${brand(subscription.card)} ****${subscription.card.last4}`"
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
                        <span :class="lightText">{{ `${subscription.renewsOnDate != "" ? "Automatic" : "Manual"}` }}</span>
                    </span>
                    <span class="flex justify-between space-x-10 py-2">
                        <span :class="darkText">Last Payment Date</span>
                        <span :class="lightText">{{ translateDate(subscription.lastPaymentDate) }}</span>
                    </span>
                    <span class="flex justify-between space-x-10 py-2">
                        <span :class="darkText">Payment Amount</span>
                        <span :class="lightText">{{ translateCurrency(subscription.lastPaymentAmount) }}</span>
                    </span>
                    <span class="flex justify-between space-x-10 py-2">
                        <span :class="darkText">Renews On</span>
                        <span :class="lightText">{{ `${(subscription.renewsOnDate != "") ? translateDate(subscription.renewsOnDate) : "Never"}` }}</span>
                    </span>
                </template>

                <template #footer>
                    
                    <Button @clicked="cancel"
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
                        :key="card.last4"
                        :value="card.last4"
                        :selectedOption="selectedCard.last4"
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
                    <RadioInput
                        @updateSelectedOption="addCard"
                        class="py-4"
                    >
                        <template #title>
                            <span :class="darkText">Add Credit Card</span>
                        </template>
                    </RadioInput>
                </template>
                <template #content v-else>
                    <BaseCreditCard
                        :text="`${brand(selectedCard)} ****${selectedCard.last4}`"
                        :subtext="`${selectedCard.expirationMonth}/${selectedCard.expirationYear}`"
                    />
                </template>

                <template #footer>
                    <Button @clicked="changeCard"
                        title="Change Payment Method"
                        textColor="bg-none text-blue-600"
                        theme="none"
                        v-if="!changingCard"
                    ></Button>
                    <Button @clicked="setCard"
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
                        <span :class="darkText">Stripe Form Goes Here</span>
                    </span>
                </template>
                <template #footer>
                    <Button @clicked="addingCard = !addingCard"
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
                    <span class="flex justify-between space-x-10 mt-2 py-2" v-for="transaction in subscription.transactions" :key="transaction.date">
                        <span :class="darkText">{{ translateDate(transaction.date) }}</span>
                        <span :class="lightText">{{ translateCurrency(transaction.amount) }}</span>
                    </span>
                    <span :class="darkText" v-if="subscription.transactions.length == 0">No transactions found.</span>
                </template>

                <template #footer>
                </template>
            </BaseCard>
          </template>
      </ClassicLayout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Moment from 'moment';
import SubscriptionService, { Subscription, SubscriptionStatuses, Brands, Card } from "../services/subscriptions";

@Component({
    name: "manage-subscriptions",
    components: {
        ClassicLayout: () => import("@/layouts/ClassicLayout.vue"),
        BaseCard: () => import("../components/BaseCard.vue"),
        BaseHeader: () => import("../components/BaseHeader.vue"),
        Button: () => import("../components/inputs/Button.vue"),
        BaseCreditCard: () => import("../components/BaseCreditCard.vue"),
        RadioInput: () => import("../components/inputs/RadioInput.vue")
    }
})
export default class extends Vue {
    @Prop({type: String, required: true})
    tenantSlug?: string;
    
    private changingCard = false;
    private addingCard = false;
    private darkText = "text-gray-800 text-sm";
    private lightText = "text-gray-500 text-sm";
    private service: SubscriptionService = new SubscriptionService();
    private subscription: Subscription | null = null;
    private paymentMethods: Card[] = [];
    private currentCard: Card | null = null;
    private selectedCard: Card | null = null;

    get status() {
        if (this.subscription) return SubscriptionStatuses[this.subscription.status];
        return 0;
    }

    brand(card: Card): string {
        return Brands[card.brand];
    }

    async mounted() {
        if (this.tenantSlug != null) {
            this.subscription = await this.service.loadSubscriptionByTenant(this.tenantSlug);
            this.paymentMethods = await this.service.loadPaymentMethodsByTenant(this.tenantSlug);
            this.currentCard = this.subscription.card;
            this.selectedCard = this.subscription.card;
        }
    }

    translateDate(inputDate: string) {
        return Moment.utc(inputDate).format("D MMM, YYYY");
    }

    translateCurrency(amount: number) {
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return formatter.format(amount);
    }

    cancel() {
        if (this.tenantSlug) this.service.cancelSubscription(this.tenantSlug);
    }

    changeCard() {
        this.changingCard = true;
    }

    setCard() {
        if (this.selectedCard) {
            this.service.changePaymentMethod(this.selectedCard.last4);
            this.currentCard = this.selectedCard;
            this.changingCard = false;
        }
    }

    updateCard(card) {
        this.selectedCard = this.paymentMethods.find(p => p.last4 == card) ?? this.selectedCard;
    }

    addCard() {
        //Use this to run any Strype functions that are required.
        this.addingCard = true;
    }
}
</script>