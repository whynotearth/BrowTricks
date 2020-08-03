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
    <div slot="content" class="p-6 text-on-background-image">
      <BaseLineItem class="mb-8">
        <span slot="title">Eyebrow PMU Services</span>
      </BaseLineItem>
      <BaseLineItem class="mb-8">
        <span slot="title">Permanent Eyeliner</span>
      </BaseLineItem>
      <BaseLineItem class="mb-8">
        <span slot="title">Lip Blush</span>
      </BaseLineItem>
      <BaseLineItem class="mb-8">
        <span slot="title">Microneedling</span>
      </BaseLineItem>
    </div>
  </LayoutFixedScrollable>
</template>

<script>
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import IconMenu from '@/assets/icons/menu.svg';
import CustomerMenuDrawer from '@/components/CustomerMenuDrawer.vue';
import BaseLineItem from '@/components/BaseLineItem.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'CustomerCategories',
  components: {
    LayoutFixedScrollable,
    BaseHeader,
    IconMenu,
    CustomerMenuDrawer,
    BaseLineItem
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
