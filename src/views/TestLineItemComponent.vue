<template>
  <div id="customer-home" class="min-h-screen flex flex-col">
    <MenuHeader class="bg-primary" />
    <MenuDrawer />
    <div
      class="p-6 pb-20 flex-grow flex flex-col items-center justify-center text-on-background"
    >
      <LineItem />
    </div>
  </div>
</template>

<script>
import MenuHeader from '@/components/MenuHeader.vue';
import MenuDrawer from '@/components/MenuDrawer.vue';
import LineItem from '@/components/ui/LineItem.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'TestLineItemComponent',
  components: {
    LineItem,
    MenuHeader,
    MenuDrawer
  },
  props: {
    tenantName: {
      type: String,
      default: 'Carissa Queen'
    },
    promoText: {
      type: String,
      default: 'Lucky you! Our promo has 12 spots left! Book now for 20% off!'
    }
  },
  computed: {
    ...mapGetters(['isMenuDrawerOpen'])
  }
};
</script>
