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

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SubscriptionService, { Subscription } from '@/services/subscriptions';

@Component
export default class extends Vue {
  subscription: Subscription | null = null;
  subscriptionService = new SubscriptionService();
  async mounted() {
    this.subscription = await this.subscriptionService.loadSubscriptionByTenant(
      this.$route.params.tenant
    );
  }
}
</script>
