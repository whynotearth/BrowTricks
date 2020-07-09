<template>
  <div class="min-h-screen mx-auto">
    <transition name="fade" mode="out-in">
      <router-view class=""></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TenantLayout',
  computed: {
    appBar() {
      return this.$route.meta.appBar;
    }
  }
};
</script>
