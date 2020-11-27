<template>
  <div class="">
    <div
      class="min-h-screen bg-background w-full flex flex-col justify-between"
    >
      <div>
        <div class="my-4">
          {{ subscription }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubscriptionService from '@/services/subscriptions';

export default {
  name: 'Subscription',
  data: () => ({
    subscription: null,
    subscriptionService: new SubscriptionService()
  }),
  async mounted() {
    this.subscription = await this.subscriptionService.loadSubscriptionByTenant(
      this.$route.params.tenantSlug
    );
  }
};
</script>
