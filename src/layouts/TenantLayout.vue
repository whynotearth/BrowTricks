<template>
  <div class="min-h-screen mx-auto">
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
