<template>
  <div
    class="my-auto items-center justify-center w-full max-w-md mx-auto pt-6 px-4"
  >
    <p
      class="tg-body-mobile text-on-background text-opacity-high text-center mb-6"
    >
      Create and store PMU forms electronically.<br />Easily send to clients via
      SMS.
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
      title="Get Started"
      @clicked="formTemplateAdd"
    />
  </div>
</template>

<script>
import { formTemplateAdd } from '@/helpers';
import { mapActions } from 'vuex';

export default {
  name: 'FormTemplatesListEmpty',
  props: ['tenantSlug'],
  methods: {
    ...mapActions('formTemplate', ['templatesFetch']),
    formTemplateAdd
  }
};
</script>
