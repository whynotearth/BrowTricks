<template>
  <div class="max-w-md mx-auto pt-6">
    <router-link
      class="block mb-3"
      :to="{ name: 'FormTemplatesEdit', params: { formId: 1 } }"
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

    <router-link class="block" :to="{ name: 'FormTemplatesAdd' }">
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
    </router-link>
  </div>
</template>

<script>
import IconAdd from '@/assets/icons/add.svg';
import IconCreate from '@/assets/icons/create.svg';
import { formatDate } from '@/helpers';

export default {
  name: 'FormTemplatesList',
  components: { IconAdd, IconCreate },
  data: () => ({
    formTemplates: [
      { id: 1, title: 'PMU Disclosure Form...', created: new Date().getTime() }
    ]
  }),
  methods: {
    formatDate
  }
};
</script>

<style scoped></style>
