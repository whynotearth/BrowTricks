<template>
  <div class="my-auto items-center justify-center w-full max-w-md mx-auto pt-6">
    <p
      class="tg-body-mobile text-on-background text-opacity-high text-center mb-6"
    >
      To be able to create custom PMU forms, please start with our templates, or
      create your own!
    </p>
    <div>
      <img
        class="mx-auto my-6"
        src="https://res.cloudinary.com/whynotearth/image/upload/v1600410233/BrowTricks/static_v2/form-template-add_vjjbma.png"
        alt=""
      />
    </div>

    <Button
      class="rounded-full mb-4 normal-case"
      title="Create PMU Form"
      @clicked="formTemplateAdd"
    />
  </div>
</template>

<script>
import { formTemplateAdd } from '@/helpers';
import { mapActions } from 'vuex';
import Button from '@/components/inputs/Button.vue';
export default {
  name: 'FormTemplateRequirement',
  components: { Button },
  beforeMount() {
    this.statusUpdate('locked');
  },
  methods: {
    ...mapActions('navigation', ['statusUpdate']),
    formTemplateAdd
  }
};
</script>

<style scoped></style>
