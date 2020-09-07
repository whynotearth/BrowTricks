<template>
  <div class="max-w-md mx-auto pt-4">
    <component :is="componentType"></component>
  </div>
</template>

<script>
import FormTemplateFieldChecklist from '@/components/pmu/FormTemplateFieldChecklist';
import EventBus from '@/utils/eventBus';
import { mapGetters } from 'vuex';

export default {
  name: 'FormTemplateFieldAddEdit',
  components: { FormTemplateFieldChecklist },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters('formTemplate', ['currentFieldGet']),
    componentType() {
      return 'FormTemplateFieldChecklist';
    },
    isEdit() {
      return this.$route.name === 'FormTemplateFieldEdit';
    }
  },
  methods: {
    init() {
      this.prepareBackRoute();
      this.model = { ...this.currentFieldGet };
    },
    prepareBackRoute() {
      EventBus.$emit('layoutBackRoute', {
        name: 'FormTemplateFieldSelection',
        query: { ...this.$route.query }
      });
    }
  }
};
</script>

<style scoped></style>
