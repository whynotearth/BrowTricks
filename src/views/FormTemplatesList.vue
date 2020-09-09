<template>
  <div class="max-w-md mx-auto pt-6">
    <a
      tabindex="0"
      class="block mb-3 cursor-pointer"
      v-for="template in templatesGet"
      :key="template.id"
      @click="editTemplate(template)"
    >
      <div class="flex justify-between items-center px-4 py-3">
        <div class="text-on-background text-opacity-high tg-body-mobile">
          <div class="text-on-background text-opacity-high mb-1">
            {{ template.name }}
          </div>
          <div class="tg-caption-mobile text-on-background text-opacity-medium">
            Created {{ formatDate(template.createdAt) }}
          </div>
        </div>
        <div>
          <IconCreate
            v-if="template.id"
            class="fill-current text-on-background text-opacity-high w-4 h-4"
          />
        </div>
      </div>
    </a>

    <a tabindex="0" class="block cursor-pointer" @click.prevent="addTemplate">
      <div class="flex justify-between items-center px-4 py-2">
        <div class="text-on-background text-opacity-high tg-body-mobile">
          Add Form
        </div>
        <div>
          <IconAdd
            class="fill-current text-on-background text-opacity-high w-4 h-4"
          />
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import IconAdd from '@/assets/icons/add.svg';
import IconCreate from '@/assets/icons/create.svg';
import { formatDate } from '@/helpers';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FormTemplatesList',
  components: { IconAdd, IconCreate },
  props: ['tenantSlug'],
  computed: {
    ...mapGetters('formTemplate', ['templatesGet'])
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions('formTemplate', [
      'currentTemplateReset',
      'currentTemplateUpdate',
      'templatesFetch'
    ]),
    formatDate,
    init() {
      this.templatesFetch({ params: { tenantSlug: this.tenantSlug } });
    },
    async editTemplate(template) {
      if (!template.id) {
        console.log('This form template has no id');
        return;
      }
      this.currentTemplateUpdate(template);
      this.$router.push({
        name: 'FormTemplateItemEdit',
        params: { formId: template.id }
      });
    },
    async addTemplate() {
      const newForm = await this.currentTemplateReset();
      console.log('newForm', newForm);
      this.$router.push({
        name: 'FormTemplateItemEdit',
        params: { formId: newForm.id }
      });
    }
  }
};
</script>
