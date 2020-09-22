<template>
  <div class="max-w-md mx-auto pt-6 px-4" v-if="client">
    <h2 class="tg-h3-mobile text-on-background mb-4">
      Choose or create a form template
    </h2>

    <ExpansionPanel
      v-for="template in templatesGet"
      :key="template.id"
      :title="template.name"
      :middleText="getTemplateStatusText(template.id)"
      leftSideClasses="w-2/3"
      @click="
        $router.push({
          name: 'PmuSignPreview',
          params: { templateId: template.id }
        })
      "
    >
      <template #preIcon>
        <IconDocument class="h-6 w-6 fill-current" />
      </template>
    </ExpansionPanel>

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
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import IconDocument from '@/assets/icons/document.svg';
import { formatDateTime, formTemplateAdd } from '@/helpers';
import { mapActions, mapGetters } from 'vuex';
import IconAdd from '@/assets/icons/add.svg';

export default {
  name: 'PmuSignTemplateSelector',
  props: ['tenantSlug', 'clientId'],
  components: { IconAdd, ExpansionPanel, IconDocument },
  computed: {
    ...mapGetters('formTemplate', ['templatesGet'])
  },
  data: () => ({
    client: null
  }),
  created() {
    this.init();
  },
  methods: {
    ...mapActions('loading', ['loadingUpdate']),
    ...mapActions('client', ['fetchClient']),
    ...mapActions('formTemplate', [
      'currentTemplateReset',
      'currentTemplateUpdate',
      'templatesFetch'
    ]),
    formTemplateAdd,
    formatDateTime,
    getTemplateStatusText(templateId) {
      const isSigned = this.client.signatures.find(
        sig => sig.formTemplateId === Number(templateId)
      );
      return isSigned ? 'Completed' : 'Incomplete';
    },
    async _fetchClient() {
      this.loadingUpdate(true);
      this.client = await this.fetchClient({
        params: {
          clientId: this.clientId,
          tenantSlug: this.tenantSlug
        }
      }).catch(() => {
        console.log('error in getting client');
      });
      this.loadingUpdate(false);
    },
    async init() {
      this._fetchClient();
      this.templatesFetch({
        params: { tenantSlug: this.tenantSlug }
      }).catch(() => {});
    }
  }
};
</script>
