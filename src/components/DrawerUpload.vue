<template>
  <BaseDrawerActions :isOpen="isOpen" @close="$emit('close')" title="Upload">
    this is upload actions...
  </BaseDrawerActions>
</template>

<script>
import BaseDrawerActions from '@/components/BaseDrawerActions';
export default {
  name: 'DrawerUpload',
  components: { BaseDrawerActions },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    console.log('drawer upload mounted');
  }
};
</script>

<style scoped></style>
