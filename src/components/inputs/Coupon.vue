<template>
    <BaseCard >
        <template #content>
            <span v-if="coupons.length > 0">
                <span
                    class="flex justify-left text-md text-gray-900"
                    v-for="coupon in coupons" :key="coupon.code + coupon.discount"
                >
                    <p class="font-hairline">First {{coupon.duration }} Days</p>
                    {{ coupon.code }}
                    <Button @clicked="removeCoupon(coupon.code)"
                        title="x"
                        textColor="bg-none text-red-600"
                        theme="none"
                    ></Button>
                </span>
            </span>
        </template>
        <template #footer>
            <span class="border-t-2 pt-2">
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
</template>

<script lang="ts">

interface Coupon {
    code: string,
    discount: number,
    duration: number
}
interface Plan {
    title: string,
    subTitle: string,
    details: string[],
    price: number
}

import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({
    name: "Coupon",
    components: {
        BaseCard: () => import("../BaseCard.vue"),
        Button: () => import("./Button.vue"),
        TextArea: () => import("./TextArea.vue")
        // StepperTop: () => import('../../../components/BaseStepperTopBar.vue'),
        // StepperBottom: () => import('../../../components/BaseStepperBottomBar.vue'),
        // ExpansionPanel: () => import('../../../components/ExpansionPanel.vue'),
        // Checkbox: () => import('../../../components/inputs/CheckBox.vue'),
        // BusinessInfo: () => import('../../../components/tenant/BusinessInfo.vue'),
        // LinkAccount: () => import('../../../components/tenant/LinkAccount.vue'),
        // Notifications: () => import('../../../components/tenant/Notifications.vue'),
        // BusinessHours: () => import('../../../components/tenant/BusinessHours.vue'),
        // PaymentMethods: () => import('../../../components/tenant/PaymentMethods.vue')
    }
})
export default class extends Vue {

    testCoupons: Coupon[] = [
        {
            code: "QUEEN",
            discount: 5,
            duration: 30
        },
        {
            code: "BRAVE",
            discount: 7,
            duration: 60
        }
    ];
    testPlans: Plan[] = [ //Move this later
        {
            title: "Basic",
            subTitle: "Our most basic plan, great for getting started!",
            details: [
                "Client Management & Orginization",
                "100 Client Profile Storage",
                "Legally Compliant Form Builder"
            ],
            price: 5
        },
        {
            title: "Intermediate",
            subTitle: "Kickstart your business with this great package!",
            details: [
                "Client Management & Orginization",
                "500 Client Profile Storage",
                "Legally Compliant Form Builder",
                "Easily Send Forms Via Text to Clients",
                "SMS & Email Notifications"
            ],
            price: 10
        },
        {
            title: "Enterprise",
            subTitle: "Advanced features for pros who need more customization",
            details: [
                "Client Management & Orginization",
                "1000+ Client Profile Storage",
                "Legally Compliant Form Builder",
                "Easily Send Forms Via Text to Clients",
                "SMS & Email Notifications",
                "Store Client Notes and Forms",
                "Easily Contact Your Clients From the App"
            ],
            price: 15
        }
    ]

    coupons: Coupon[] = [];
    plans: Plan[] = [];
    addingCoupon = false;
    couponCode = "";

    created() {
        
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
        let testCode = this.couponCode.toUpperCase();
        let index = this.testCoupons.findIndex(f => f.code == testCode);
        if (index == -1) return;
        if (this.coupons.findIndex(f => f.code == testCode) != -1) return;

        this.coupons.push(this.testCoupons[index]);
        this.addingCoupon = false;
        this.couponCode = "";
    }

    removeCoupon(code: string) {
        //Do whatever backend things need doing to actually remove a coupon.
        let index = this.coupons.findIndex(c => c.code == code);
        if (index == -1) return;

        this.coupons.splice(index, 1);
        this.couponCode = "";
    }
}

</script>