<template>
  <div class="max-w-md mx-auto pt-6">
    <router-link
      class="block mb-3"
      :to="{ name: 'FormTemplateItemEdit', params: { formId: 1 } }"
      v-for="template in formTemplates"
      :key="template.id"
    >
      <div class="flex justify-between items-center px-4 py-3">
        <div class="text-on-background text-opacity-high tg-body-mobile">
          <div class="text-on-background text-opacity-high mb-1">
            PMU Disclosure Form...
          </div>
          <div class="tg-caption-mobile text-on-background text-opacity-medium">
            Created {{ formatDate(template.created) }}
          </div>
        </div>
        <div>
          <IconCreate
            class="fill-current text-on-background text-opacity-high w-4 h-4"
          />
        </div>
      </div>
    </router-link>

    <a class="block cursor-pointer" @click.prevent="addForm">
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
      { id: 1, title: 'PMU Disclosure Form...', created: new Date().getTime() }
    ]
  }),
  methods: {
    ...mapActions('formTemplate', ['currentTemplateReset']),
    formatDate,
    async addForm() {
      const newForm = await this.currentTemplateReset();
      this.$router.push({
        name: 'FormTemplatesAdd',
        params: { formId: newForm.id }
      });
    }
  }
};
</script>
