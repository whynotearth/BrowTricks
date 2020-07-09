<template>
  <div class="min-h-screen mx-auto">
    <transition name="fade" mode="out-in">
      <router-view class="container mx-auto"></router-view>
    </transition>
  </div>
</template>

<script>
import NewItemIcon from '@/assets/icons/new_item.svg';

export default {
  name: 'TenantLayout',
  components: {
    NewItemIcon
  },
  computed: {
    appBar() {
      return this.$route.meta.appBar;
    }
  }
};
</script>
