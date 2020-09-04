<template>
  <div class="text-left">
    <transition name="fadeslow">
      <router-view v-show="!isLoading" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'FormTemplates',
  computed: {
    ...mapGetters('loading', ['isLoading'])
  }
};
</script>

<style scoped></style>
