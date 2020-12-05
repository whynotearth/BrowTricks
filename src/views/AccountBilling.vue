<template>
  <PageContentBoard>
    <div class="max-w-md w-full mx-auto pt-6 px-4">
      <div class="pb-4">
        <h3 class="tg-caption-mobile text-on-surface mb-6">Account</h3>

        <ExpansionPanel
          title="Activity"
          @click="
            $router.push({
              name: 'AccountBillingActivity'
            })
          "
        >
        </ExpansionPanel>

        <ExpansionPanel
          title="Payment Methods"
          @click="
            $router.push({
              name: 'AccountBillingPaymentMethods'
            })
          "
        >
        </ExpansionPanel>

        <ExpansionPanel
          title="Subscription"
          endText="Pro"
          @click="
            $router.push({
              name: 'AccountBillingSubscriptions'
            })
          "
        >
        </ExpansionPanel>
      </div>
    </div>
  </PageContentBoard>
  <!-- <div>
    <router-link :to="{ name: 'AccountBillingActivity' }">Activity</router-link>
    <router-link :to="{ name: 'AccountBillingPaymentMethods' }"
      >Payment Methods</router-link
    >
    <router-link :to="{ name: 'AccountBillingSubscriptions' }"
      >Subscription</router-link
    >
  </div> -->
</template>

<script>
import ExpansionPanel from '@/components/ExpansionPanel.vue';
export default {
  name: 'AccountBilling',
  components: { ExpansionPanel }
};
</script>

<style scoped></style>
