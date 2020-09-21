<template>
  <div class="page-content--min-h text-left flex flex-col">
    <transition name="fadeslow">
      <router-view v-on="$listeners" v-show="!loadingGet" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'FormTemplates',
  computed: {
    ...mapGetters('loading', ['loadingGet'])
  }
};
</script>
