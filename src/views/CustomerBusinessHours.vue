<template>
  <div class="customer-view">
    <LayoutFixedScrollable>
      <BaseMenuHeader slot="header" :tenantName="tenantName" />
      <div slot="content" class="p-6 m-auto text-on-background-image">
        <div class="tg-h1-mobile mb-5">Business Hours</div>
        <div class="tg-body-mobile">
          <div class="flex flex-col w-64">
            <div class="flex justify-between w-full pb-4">
              <div>Monday</div>
              <div>9:00AM - 5:00PM</div>
            </div>
            <div class="flex justify-between w-full pb-4">
              <div>Tuesday</div>
              <div>9:00AM - 5:00PM</div>
            </div>
            <div class="flex justify-between w-full pb-4">
              <div>Wednesday</div>
              <div>9:00AM - 5:00PM</div>
            </div>
            <div class="flex justify-between w-full pb-4">
              <div>Thursday</div>
              <div>9:00AM - 5:00PM</div>
            </div>
            <div class="flex justify-between w-full pb-4">
              <div>Friday</div>
              <div>9:00AM - 5:00PM</div>
            </div>
            <div class="flex justify-between w-full pb-4">
              <div>Saturday</div>
              <div>9:00AM - 5:00PM</div>
            </div>
            <div class="flex justify-between w-full">
              <div>Sunday</div>
              <div>Closed</div>
            </div>
          </div>
        </div>
      </div>
    </LayoutFixedScrollable>
  </div>
</template>

<script>
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import BaseMenuHeader from '@/components/BaseMenuHeader.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'CustomerBusinessHours',
  components: {
    LayoutFixedScrollable,
    BaseMenuHeader
  },
  computed: {
    ...mapGetters({
      tenantName: 'getTenantName'
    })
  }
};
</script>
