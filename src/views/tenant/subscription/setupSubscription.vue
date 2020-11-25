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
            <BaseCard class="flex justify-center my-6 ">
                <template #header>
                    <p>Stripe Card</p>
                </template>
            </BaseCard>
            <Coupon class="flex justify-center my-6 " />
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
import { Prop } from "vue-property-decorator";

@Component({
    name: "setup-subscription",
    components: {
        StepperTop: () => import('@/components/BaseStepperTopBar.vue'),
        StepperBottom: () => import('@/components/BaseStepperBottomBar.vue'),
        ExpansionPanel: () => import('@/components/ExpansionPanel.vue'),
        Checkbox: () => import('@/components/inputs/CheckBox.vue'),
        Coupon: () => import('@/components/inputs/Coupon.vue'),
        BaseCard: () => import('@/components/BaseCard.vue')
    }
})
export default class extends Vue {

    private agree = false;
    private stripe = false;
    private coupon = false;
    private plan = false;

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
    ]

    updateAgree(consent: boolean) {
        this.agree = consent;
    }

}

</script>