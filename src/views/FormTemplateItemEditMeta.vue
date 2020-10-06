<template>
  <div class="max-w-md mx-auto pt-6 px-4">
    <div class="mb-6">
      <h2 class="tg-h3-mobile text-on-background text-opacity-high mb-2">
        Name your form template.
      </h2>
      <p class="tg-body-mobile text-on-background text-opacity-medium">
        You can edit this later.
      </p>
    </div>
    <MaterialInput
      margin="mb-6"
      v-model.trim="$v.name.$model"
      label="Name"
      placeholder="e.g. PMU Agreement Form"
      :validatorModel="$v.name"
    >
      <p v-if="!$v.name.required">
        Name of form template is required
      </p>
    </MaterialInput>

    <Button class="rounded-full" title="Save" @clicked="save" />
  </div>
</template>

<script>
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import { mapActions, mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import { showOverlayAndRedirect } from '@/helpers.js';

export default {
  name: 'FormTemplatesList',
  components: { MaterialInput },
  props: ['tenantSlug'],
  data: () => ({
    name: ''
  }),
  validations: {
    name: {
      required
    }
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters('formTemplate', ['currentTemplateGet'])
  },
  methods: {
    ...mapActions('formTemplate', [
      'templateFetch',
      'currentFieldUpdate',
      'templateDelete',
      'templateSave'
    ]),
    async init() {
      if (!this.currentTemplateGet.draft) {
        // TODO: handle errors
        await this.templateFetch({
          params: {
            templateId: this.$route.params.formId,
            tenantSlug: this.tenantSlug
          }
        });
      }
    },

    save() {
      this.templateSave({
        template: { ...this.currentTemplateGet, name: this.name },
        tenantSlug: this.tenantSlug
      })
        .then(templateId => {
          this.redirectBack(templateId);
        })
        .catch(error => {
          console.log(error);
          alert('Something went wrong');
        });
    },

    redirectBack(templateId) {
      showOverlayAndRedirect({
        title: 'Success!',
        message: 'Form template saved!',
        route: {
          name: 'FormTemplateItemEdit',
          params: { formId: templateId || this.$route.params.formId },
          query: { refresh: 1 }
        }
      });
    }
  }
};
</script>
