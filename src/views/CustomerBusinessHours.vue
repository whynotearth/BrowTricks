<template>
  <LayoutFixedScrollable>
    <BaseHeader
      slot="header"
      class="text-on-background-image"
      @iconClicked="toggleMenuDrawer"
    >
      <IconMenu slot="icon" class="h-6 w-6 fill-current" />
      <span slot="content" class="pl-5">{{ tenantName }}</span>
      <CustomerMenuDrawer slot="menu-drawer" />
    </BaseHeader>
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
</template>

<script>
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import IconMenu from '@/assets/icons/menu.svg';
import CustomerMenuDrawer from '@/components/CustomerMenuDrawer.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'CustomerBusinessHours',
  components: {
    LayoutFixedScrollable,
    BaseHeader,
    IconMenu,
    CustomerMenuDrawer
  },
  computed: {
    ...mapGetters({
      tenantName: 'getTenantName'
    })
  },
  methods: {
    ...mapMutations(['toggleMenuDrawer'])
  }
};
</script>
