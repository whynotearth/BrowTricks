<template>
  <div class="text-left">
    <transition name="fadeslow">
      <router-view v-on="$listeners" v-show="!loadingGet" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'FormTemplateItem',
  computed: {
    ...mapGetters('loading', ['loadingGet'])
  }
};
</script>

<style scoped></style>
