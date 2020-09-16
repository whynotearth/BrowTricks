<template>
  <div class="max-w-md mx-auto pt-6">
    <h2 class="text-body-mobile text-on-background px-4 mb-4">
      Choose a form template
    </h2>
    <router-link
      tabindex="0"
      class="block mb-3 cursor-pointer"
      v-for="template in templatesGet"
      :key="template.id"
      :to="{
        name: 'PmuSignPreview',
        params: { templateId: template.id }
      }"
    >
      <div class="flex justify-between items-center px-4 py-3">
        <div class="text-on-background text-opacity-high tg-body-mobile">
          <div class="text-on-background text-opacity-high mb-1">
            {{ template.name }}
          </div>
          <div class="tg-caption-mobile text-on-background text-opacity-medium">
            Created
            {{ formatDateTime(template.createdAt) }}
          </div>
        </div>
      </div>
    </router-link>

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
import { formatDateTime } from '@/helpers';
import { mapActions, mapGetters } from 'vuex';
import IconAdd from '@/assets/icons/add.svg';

export default {
  name: 'PmuSignTemplateSelector',
  props: ['tenantSlug'],
  components: { IconAdd },
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
    formatDateTime,
    init() {
      this.templatesFetch({
        params: { tenantSlug: this.tenantSlug }
      }).catch(() => {});
    },
    async addTemplate() {
      const newForm = await this.currentTemplateReset();
      this.$router.push({
        name: 'FormTemplateItemEdit',
        params: { formId: newForm.id }
      });
    }
  }
};
</script>
