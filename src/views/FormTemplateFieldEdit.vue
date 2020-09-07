<template>
  <div class="max-w-md mx-auto pt-6">
    <component
      @save="submit"
      @remove="removeField"
      :is="componentType"
    ></component>
  </div>
</template>

<script>
import FormTemplateFieldTextarea from '@/components/pmu/FormTemplateFieldTextarea';
import EventBus from '@/utils/eventBus';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FormTemplateFieldEdit',
  components: { FormTemplateFieldTextarea },
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
    ...mapActions('formTemplate', ['currentFieldReset']),
    init() {
      this.prepareBackRoute();
      this.model = { ...this.currentFieldGet };
    },
    prepareBackRoute() {
      EventBus.$emit('layoutBackRoute', {
        name: 'FormTemplateFieldSelection',
        query: { ...this.$route.query }
      });
    },
    submit(field) {
      console.log('TODO: save field', field);
      this.redirectBack();
    },
    removeField() {
      console.log('TODO: delete field');
      this.redirectBack();
    },
    redirectBack() {
      let route = {
        name: 'FormTemplatesEdit',
        params: { formId: this.$route.query.formId }
      };
      this.$router.push(route);
    }
  }
};
</script>

<style scoped></style>
