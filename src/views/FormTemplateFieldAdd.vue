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
  name: 'FormTemplateFieldAdd',
  components: { FormTemplateFieldTextarea },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters('formTemplate', ['currentFieldGet', 'currentTemplateGet']),
    componentType() {
      return 'FormTemplateFieldTextarea';
    }
  },
  destroyed() {
    this.currentFieldReset();
  },
  methods: {
    ...mapActions('formTemplate', [
      'currentFieldReset',
      'currentTemplateUpdate'
    ]),
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
      const updatedTemplate = {
        ...this.currentTemplateGet,
        fields: [...this.currentTemplateGet.fields, field]
      };
      console.log('updatedTemplate', updatedTemplate);
      this.currentTemplateUpdate(updatedTemplate);
      this.redirectBack();
    },
    removeField() {
      this.redirectBack();
    },
    redirectBack() {
      let route = {
        name: 'FormTemplatesAdd'
      };
      this.$router.push(route);
    }
  }
};
</script>

<style scoped></style>
