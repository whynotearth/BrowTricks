<template>
  <div
    class="my-auto items-center justify-center w-full max-w-md mx-auto pt-6 px-4"
  >
    <p
      class="tg-body-mobile text-on-background text-opacity-high text-center mb-6"
    >
      To be able to create custom PMU forms, please create a new template.
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
import { formTemplateAdd, navigationStatusUpdate } from '@/helpers';
import { mapActions } from 'vuex';

export default {
  name: 'FormTemplatesListEmpty',
  props: ['tenantSlug'],
  beforeMount() {
    navigationStatusUpdate('locked');
  },
  async mounted() {
    await this.templatesFetch({
      params: { tenantSlug: this.tenantSlug }
    })
      .then(list => {
        if (list && list.length > 0) {
          navigationStatusUpdate('normal');
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    ...mapActions('navigation', ['statusUpdate']),
    ...mapActions('formTemplate', ['templatesFetch']),
    formTemplateAdd
  }
};
</script>

<style scoped></style>
