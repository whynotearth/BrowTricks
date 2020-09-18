<template>
  <div>
    <img
      src="https://res.cloudinary.com/whynotearth/image/upload/v1600410233/BrowTricks/static_v2/form-template-add_vjjbma.png"
      alt=""
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'FormTemplateCreationRequirement',
  beforeMount() {
    this.statusUpdate('locked');
  },
  methods: {
    ...mapActions('navigation', ['statusUpdate'])
  }
};
</script>

<style scoped></style>
