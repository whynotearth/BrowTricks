<template>
  <BaseDrawerActions
    :isOpen="isOpen"
    @close="$emit('close')"
    title="Upgrade your plan now!"
  >
    <!-- if bottom space is needed: pb-4 -->
    <div class="max-w-md mx-auto w-full tg-body-mobile">
      <div v-if="!hasProType">
        <BaseCard className="flex flex-col mb-4">
          <div class="flex mb-4">
            <RadioInput v-model="selectedType" value="silver">
              <template #title>
                <h2 class="tg-h2-mobile text-on-background text-opacity-high">
                  Silver ($10/mo)
                </h2>
              </template>
            </RadioInput>
          </div>
          <p>
            Upgrade to Silver for video cloud storage up to 500mg and unlimited
            PMU custom form builder
          </p>

          <hr class="my-4" />

          <dl class="text-left feature-list tg-caption-mobile mb-4">
            <dt><IconCheck class="list-tick" /><span>1000+ Users</span></dt>
            <dt><IconCheck class="list-tick" /><span>Client Notes</span></dt>
            <dt><IconCheck class="list-tick" /><span>Client Photos</span></dt>
            <dt><IconCheck class="list-tick" /><span>Ongoing Support</span></dt>
            <dt>
              <IconCheck class="list-tick" /><span>PMU Form Builder</span>
            </dt>
            <dt>
              <IconCheck class="list-tick" /><span
                >Video Cloud Storage (500 MB)</span
              >
            </dt>
            <dt>
              <IconLock class="list-lock" /><span
                >Scheduling &amp; Booking</span
              >
            </dt>
          </dl>
          <a href="#" class="text-center block">See terms and conditions</a>
        </BaseCard>

        <!-- Standard -->
        <BaseCard className="flex flex-col mb-8">
          <div class="flex mb-4">
            <RadioInput v-model="selectedType" value="standard">
              <template #title>
                <h2 class="tg-h2-mobile text-on-background text-opacity-high">
                  Standard (Free)
                </h2>
              </template>
            </RadioInput>
          </div>
          <p>
            Upgrade to Silver for video cloud storage up to 500mg and unlimited
            PMU custom form builder
          </p>

          <hr class="my-4" />

          <dl class="text-left feature-list tg-caption-mobile mb-4">
            <dt><IconCheck class="list-tick" /><span>1000+ Users</span></dt>
            <dt><IconCheck class="list-tick" /><span>Client Notes</span></dt>
            <dt><IconCheck class="list-tick" /><span>Client Photos</span></dt>
            <dt><IconCheck class="list-tick" /><span>Ongoing Support</span></dt>
            <dt><IconLock class="list-lock" /><span>PMU Form Builder</span></dt>
            <dt>
              <IconLock class="list-lock" /><span
                >Video Cloud Storage (500 MB)</span
              >
            </dt>
            <dt>
              <IconLock class="list-lock" /><span
                >Scheduling &amp; Booking</span
              >
            </dt>
          </dl>
          <a href="#" class="text-center block">See terms and conditions</a>
        </BaseCard>
      </div>

      <Button
        v-if="!hasProType"
        :title="`Upgrade to ${selectedType} Plan Now`"
        :radius="null"
        class="w-full"
      />

      <Button
        v-if="hasProType"
        title="Get Started"
        :radius="null"
        class="w-full"
      />
    </div>
  </BaseDrawerActions>
</template>

<script>
import IconCheck from '@/assets/icons/check.svg';
import IconLock from '@/assets/icons/lock.svg';
import BaseDrawerActions from '@/components/BaseDrawerActions';
import RadioInput from '@/components/inputs/RadioInput';
import { mapGetters } from 'vuex';

export default {
  name: 'DrawerAccountTypeSelector',
  components: { BaseDrawerActions, IconCheck, IconLock, RadioInput },
  data: () => ({ activeSubscribtion: 'standard', selectedType: 'standard' }),
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('formTemplate', ['currentFieldGet']),
    hasProType() {
      return this.activeSubscribtion !== 'standard';
    }
  }
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
