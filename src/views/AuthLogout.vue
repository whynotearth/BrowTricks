<template>
  <div>
    <p>Please wait</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'AuthLogout',
  created() {
    this.logout();
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
};
</script>

<style scoped></style>
