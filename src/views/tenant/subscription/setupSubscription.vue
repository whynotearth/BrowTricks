<template>
    <div>
        <StepperTop :navigation="navigation" :page="5"/>
        <div v-if="!stripe" class="mx-10">
            <p>Your Brow tricks Beauty subscription starts as soon as you set up payment.</p>
            <p class="font-bold">No Commitments</p>
            <p class="font-bold pb-4">Cancel online anytime.</p>
            <p class="font-hairline pt-4 mx-2 text-right">Secure Server</p>
            <ExpansionPanel title="Credit or Debit Card" @click="stripe = !stripe"/>
        </div>
        <div v-if="stripe" class="mx-10">
            <p>Set up your credit or debit card.</p>
            <BaseCard class="flex justify-center my-6">
                <template #header>
                    <p>Stripe Card</p>
                </template>
            </BaseCard>
            <PlanSelector v-if="plan == true"
                v-model="selectedPlanID"
                :plans="testPlans"
            ></PlanSelector>
            <BaseCard class="flex justify-center my-6">
                <template #content>
                    <div v-if="coupon != null" class='text-left border-b-2 mb-2'>
                        <p class="font-hairline">First 30 Days</p>
                        <span class="text-xl text-gray-700 line-through">{{ formatter.format(selectedPlan.price )}}</span>
                        <span class="text-xl text-gray-700"> {{ calculateDiscount() }} </span>
                        <p class="">
                            {{ selectedPlan.name }} ( Code: {{ coupon.code }} )
                        </p>
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
                            <Button @clicked="plan = !plan"
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
                            <Button @clicked="error = ''"
                                title="Ok"
                                textColor="text-red-600"
                                theme="none"
                            ></Button>
                        </span>
                        <TextArea v-if="addingCoupon"
                            rows="1"
                            label="Coupon Code"
                            @input="updateCoupon"
                        />
                        <Button @clicked="openCoupon"
                            title="Add Coupon"
                            textColor="bg-none text-purple-600"
                            theme="none"
                        ></Button>
                    </span>
                </template>
            </BaseCard>
            <p>By checking the checkbox below, you agree to our Terms of Use, Privacy Statement, and that you are over 18. You may cancel at any time. Brow Tricks Beauty will automatically continue your membership and charge the membership fee (currently {subscription price}) to your payment method on a monthly basis until you cancel.</p>
            <Checkbox
                :inputModel="agree"
                label="I Agree"
                :checked="agree"
                @update="updateAgree"
            />
        </div>
        <StepperBottom nextStepText="Finish" :page="5" :hideNext="!agree"/>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { Plan, Coupon } from "@/services/subscriptions";

@Component({
    name: "setup-subscription",
    components: {
        StepperTop: () => import('@/components/BaseStepperTopBar.vue'),
        StepperBottom: () => import('@/components/BaseStepperBottomBar.vue'),
        ExpansionPanel: () => import('@/components/ExpansionPanel.vue'),
        Button: () => import('@/components/inputs/Button.vue'),
        Checkbox: () => import('@/components/inputs/CheckBox.vue'),
        BaseCard: () => import('@/components/BaseCard.vue'),
        PlanSelector: () => import ("@/components/PlanSelector.vue"),
        PlanDetail: () => import ("@/components/PlanDetail.vue"),
        TextArea: () => import("@/components/inputs/TextAreaInput.vue")
    }
})
export default class extends Vue {

    private agree = false;
    private stripe = false;
    private plan = false;
    private selectedPlanID = "";

    navigation = [
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
    ];

    testPlans: Plan[] = [ //Move this later
        {
            id: "subscription-basic",
            name: "Basic",
            price: 5,
            description: "Our most basic plan, great for getting started!",
            features: [
                "Client Management & Orginization",
                "100 Client Profile Storage",
                "Legally Compliant Form Builder"
            ],
            terms: "Test terms, basic and long terms for things."
        },
        {
            id: "subscription-intermediate",
            name: "Intermediate",
            price: 10,
            description: "Kickstart your business with this great package!",
            features: [
                "Client Management & Orginization",
                "500 Client Profile Storage",
                "Legally Compliant Form Builder",
                "Easily Send Forms Via Text to Clients",
                "SMS & Email Notifications"
            ],
            terms: "Test terms, basic and long terms for things."
        },
        {
            id: "subscription-enterprise",
            name: "Enterprise",
            price: 15,
            description: "Advanced features for pros who need more customization",
            features: [
                "Client Management & Orginization",
                "1000+ Client Profile Storage",
                "Legally Compliant Form Builder",
                "Easily Send Forms Via Text to Clients",
                "SMS & Email Notifications",
                "Store Client Notes and Forms",
                "Easily Contact Your Clients From the App"
            ],
            terms: "Test terms, basic and long terms for things."
        }
    ];

    testCoupons: Coupon[] = [
        {
            code: "QUEEN",
            discount: 5,
        },
        {
            code: "BRAVE",
            discount: 7,
        }
    ];

    coupon: Coupon | null = null;
    addingCoupon = false;
    couponCode = "";
    error = "";
    selectedPlan: Plan | null = null;

    formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    created() {
        this.selectedPlan = this.testPlans[0];
        this.selectedPlanID = this.testPlans[0].id;
    }

    updateAgree(consent: boolean) {
        this.agree = consent;
    }

        updateCoupon(value: string) {
        this.couponCode = value;
    }

    openCoupon() {
        if (this.addingCoupon) this.validateCoupon();
        else this.addingCoupon = true;
        this.couponCode = "";
    }

    validateCoupon() {
        //Send code to server for testing
        if (this.couponCode.length == 0) return
        let testCode = this.couponCode;
        let index = this.testCoupons.findIndex(f => f.code === testCode);
        if (index == -1) {
            this.error = "Invalid Coupon Code: " + testCode;
            return;
        }
        this.coupon = this.testCoupons[index];
        this.addingCoupon = false;
        this.couponCode = "";
    }

    calculateDiscount() {
        let discount = this.coupon?.discount ?? 0;
        if(this.selectedPlan && discount >= this.selectedPlan.price) return "FREE";
        if(this.selectedPlan) return this.formatter.format(this.selectedPlan.price - discount);
    }

    @Watch("selectedPlanID")
    changePlan(newVal: string, oldVal: string) {
        this.plan = false;
        this.selectedPlan = this.testPlans.find(t => t.id == newVal) ?? null;
    }

}

</script>