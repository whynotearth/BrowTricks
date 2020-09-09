<template>
  <div class="max-w-md mx-auto pt-6">
    <component
      :initialModel="currentFieldGet"
      @save="submit"
      @remove="removeField"
      :is="componentType"
    ></component>
  </div>
</template>

<script>
import FormTemplateFieldTextarea from '@/components/formTemplate/FormTemplateFieldTextarea';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FormTemplateFieldEdit',
  components: { FormTemplateFieldTextarea },
  props: ['tenantSlug'],
  created() {
    this.init();
  },
  computed: {
    ...mapGetters('formTemplate', ['currentFieldGet']),
    componentType() {
      return 'FormTemplateFieldTextarea';
    }
  },
  destroyed() {
    this.currentFieldReset();
  },
  methods: {
    ...mapActions('formTemplate', ['currentFieldReset', 'saveField']),
    init() {
      this.model = { ...this.currentFieldGet };
    },
    submit(field) {
      this.saveField({
        tenantSlug: this.tenantSlug,
        field,
        formId: Number(this.$route.params.formId)
      });
      this.redirectBack();
    },
    removeField() {
      console.log('TODO: delete field');
      this.redirectBack();
    },
    redirectBack() {
      this.$router.push({ name: 'FormTemplateItemEdit' });
    }
  }
};
</script>

<style scoped></style>
