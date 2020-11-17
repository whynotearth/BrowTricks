<template>
  <div class="bg-pattern p-10">
    <div class="bg-background p-4">
      <div class="max-w-3xl mx-auto py-10">
        <h2
          class="tg-h1-mobile text-on-background text-opacity-medium text-center mb-6"
        >
          Pricing
        </h2>
        <div class="grid grid-flow-row md:grid-flow-col gap-4 md:gap-16 px-6">
          <BaseCard className="flex flex-col">
            <h3 class="tg-h2-mobile mb-4">Standard (Free)</h3>
            <div class="tg-body-mobile">
              <p class="mb-5">
                Standard plan created to fit the needs of salons of all sizes.
              </p>

              <hr class="mb-5" />

              <dl class="text-left feature-list">
                <dt><IconCheck class="list-tick" /><span>1000+ Users</span></dt>
                <dt>
                  <IconCheck class="list-tick" /><span>Client Notes</span>
                </dt>
                <dt>
                  <IconCheck class="list-tick" /><span>Client Photos</span>
                </dt>
                <dt>
                  <IconCheck class="list-tick" /><span>Ongoing Support</span>
                </dt>
                <dt>
                  <IconLock class="list-lock" /><span>PMU Form Builder</span>
                </dt>
                <dt>
                  <IconLock class="list-lock" /><span
                    >Video Cloud Storage (500 MB)</span
                  >
                </dt>
              </dl>
            </div>
          </BaseCard>

          <BaseCard className="flex flex-col">
            <h3 class="tg-h2-mobile mb-4">Pro ($10/mo)</h3>
            <div class="tg-body-mobile">
              <p class="mb-5">
                Upgrade to Pro for video cloud storage up to 500mg and unlimited
                PMU custom form builder
              </p>

              <hr class="mb-5" />

              <dl class="text-left feature-list">
                <dt><IconCheck class="list-tick" /><span>1000+ Users</span></dt>
                <dt>
                  <IconCheck class="list-tick" /><span>Client Notes</span>
                </dt>
                <dt>
                  <IconCheck class="list-tick" /><span>Client Photos</span>
                </dt>
                <dt>
                  <IconCheck class="list-tick" /><span>Ongoing Support</span>
                </dt>
                <dt>
                  <IconCheck class="list-tick" /><span>PMU Form Builder</span>
                </dt>
                <dt>
                  <IconCheck class="list-tick" /><span
                    >Video Cloud Storage (500 MB)</span
                  >
                </dt>
              </dl>
            </div>
          </BaseCard>
        </div>

        <Button
          background="bg-brand6"
          textColor="text-on-brand6"
          maxWidth="max-w-240"
          radius="rounded-md"
          title="Try it now"
          class="mt-6"
          :to="{ name: 'AuthSignup' }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard';
import IconCheck from '@/assets/icons/check.svg';
import IconLock from '@/assets/icons/lock.svg';

export default {
  name: 'ContentPricing',
  components: { BaseCard, IconCheck, IconLock }
};
</script>

<style scoped>
.feature-list > dt {
  @apply flex py-2;
}
.list-tick {
  @apply text-success w-4 h-4 mr-4;
}
.list-lock {
  @apply text-error w-4 h-4 mr-4;
}
</style>
