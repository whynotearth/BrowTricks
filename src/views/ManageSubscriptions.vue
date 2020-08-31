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
                    <span class="flex justify-between space-x-10">
                        <span :class="darkText">Status</span>
                        <span :class="lightText">{{ status }}</span>
                    </span>
                    <span class="flex justify-between space-x-10">
                        <span :class="darkText">Payments</span>
                        <span :class="lightText">{{ `${subscription.renewsOnDate != "" ? "Automatic" : "Manual"}` }}</span>
                    </span>
                    <span class="flex justify-between space-x-10">
                        <span :class="darkText">Last Payment Date</span>
                        <span :class="lightText">{{ subscription.lastPaymentDate }}</span>
                    </span>
                    <span class="flex justify-between space-x-10">
                        <span :class="darkText">Payment Amount</span>
                        <span :class="lightText">{{ subscription.lastPaymentAmount }}</span>
                    </span>
                    <span class="flex justify-between space-x-10">
                        <span :class="darkText">Renews On</span>
                        <span :class="lightText">{{ `${(subscription.renewsOnDate != "") ? subscription.renewsOnDate : "Never"}` }}</span>
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
            
            <BaseCard class="flex justify-center mt-6">
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
                    >
                        <template #title>
                            <BaseCreditCard
                                :text="`${brand(card)} ****${card.last4}`"
                                :subtext="`${card.expirationMonth}/${card.expirationYear}`"
                            />
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
            
            <BaseCard class="flex justify-center mt-6">
                <template #header>
                    <p class="flex justify-left text-md text-gray-900">Transactions</p>
                </template>

                <template #content>
                    <span class="flex justify-between space-x-10 mt-2" v-for="transaction in subscription.transactions" :key="transaction.date">
                        <span :class="darkText">{{ transaction.date }}</span>
                        <span :class="lightText">{{ transaction.amount }}</span>
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
    private darkText = "text-gray-800 text-sm";
    private lightText = "text-gray-500 text-sm";
    private service: SubscriptionService = new SubscriptionService();
    private subscription: Subscription | null = null;
    // {
    //     id: -1,
    //     status: SubscriptionStatuses.Unknown,
    //     lastPaymentAmount: 0,
    //     lastPaymentDate: 'Unknown',
    //     renewsOnDate: 'Unknown',
    //     card: {
    //         brand: Brands.Unknown,
    //         last4: "",
    //         expirationMonth: 0,
    //         expirationYear: 0
    //     },
    //     transactions: []
    // };
    private paymentMethods: Card[] = [];
    private currentCard: Card | null = null;// = this.subscription.card;
    private selectedCard: Card | null = null;// = this.subscription.card;

    get status() {
        return SubscriptionStatuses[this.subscription.status];
    }

    // get brand() {
    //     return Brands[this.subscription.card.brand];
    // }

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

    cancel() {
        this.service.cancelSubscription(this.tenantSlug);
    }

    changeCard() {
        this.changingCard = true;
    }

    setCard() {
        this.service.changePaymentMethod(this.selectedCard.last4);
        this.currentCard = this.selectedCard;
        this.changingCard = false;
    }

    updateCard(card) {
        this.selectedCard = this.paymentMethods.find(p => p.last4 == card) ?? this.selectedCard;
    }
}
</script>