<template>
  <div class="h-full min-h-vh100 mx-auto">
    <transition name="fade" mode="out-in">
      <slot></slot>
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
