<template>
  <div class="max-w-md mx-auto pt-6">
    <a
      tabindex="0"
      class="block mb-3 cursor-pointer"
      v-for="template in formTemplates"
      :key="template.id"
      @click="editTemplate(template)"
    >
      <div class="flex justify-between items-center px-4 py-3">
        <div class="text-on-background text-opacity-high tg-body-mobile">
          <div class="text-on-background text-opacity-high mb-1">
            PMU Disclosure Form...
          </div>
          <div class="tg-caption-mobile text-on-background text-opacity-medium">
            Created {{ formatDate(template.createdAt) }}
          </div>
        </div>
        <div>
          <IconCreate
            class="fill-current text-on-background text-opacity-high w-4 h-4"
          />
        </div>
      </div>
    </a>

    <a class="block cursor-pointer" @click.prevent="addTemplate">
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
import { mapActions } from 'vuex';

export default {
  name: 'FormTemplatesList',
  components: { IconAdd, IconCreate },
  data: () => ({
    // TODO: use real data
    formTemplates: [
      {
        id: 1,
        title: 'PMU Disclosure Form...',
        createdAt: new Date().getTime(),
        fields: []
      }
    ]
  }),
  methods: {
    ...mapActions('formTemplate', [
      'currentTemplateReset',
      'currentTemplateUpdate'
    ]),
    formatDate,
    async editTemplate(template) {
      this.currentTemplateUpdate(template);
      this.$router.push({
        name: 'FormTemplateItemEdit',
        params: { formId: template.id }
      });
    },
    async addTemplate() {
      const newForm = await this.currentTemplateReset();
      this.$router.push({
        name: 'FormTemplatesAdd',
        params: { formId: newForm.id }
      });
    }
  }
};
</script>
