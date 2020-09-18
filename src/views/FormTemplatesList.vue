<template>
  <div class="max-w-md w-full mx-auto pt-6">
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
            Created
            {{ formatDateTime(template.createdAt) }}
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

    <a
      tabindex="0"
      class="block cursor-pointer"
      @click.prevent="formTemplateAdd"
    >
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
import { formatDateTime, formTemplateAdd } from '@/helpers';
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
      'templateAdd',
      'currentTemplateUpdate',
      'templatesFetch'
    ]),
    formTemplateAdd,
    formatDateTime,
    init() {
      this.templatesFetch({
        params: { tenantSlug: this.tenantSlug }
      }).catch(() => {});
    },
    async editTemplate(template) {
      this.currentTemplateUpdate(template);
      this.$router.push({
        name: 'FormTemplateItemEdit',
        params: { formId: template.id },
        query: { refresh: 1 }
      });
    }
  }
};
</script>
