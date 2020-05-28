<template>
  <LayoutFixedScrollable>
    <BaseHeader
      slot="header"
      class="bg-secondary text-on-secondary"
      @iconClicked="toggleMenuDrawer"
    >
      <IconMenu slot="icon" class="h-6 w-6 fill-current" />
      <span slot="content" class="pl-5">{{ tenantName }}</span>
      <CustomerMenuDrawer slot="menu-drawer" />
    </BaseHeader>
    <div slot="content" class="m-auto">
      <div class="loading" />
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
  name: 'LoadingSpinnerTest',
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
