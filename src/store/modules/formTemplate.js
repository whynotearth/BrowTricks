import { cloneDeep } from 'lodash-es';
import { randomId } from '@/helpers.js';
import { FormTemplateService } from '@whynotearth/meredith-axios';
import {
  adaptApiTemplatesToModel,
  adaptApiTemplateToModel
} from '@/services/formTemplate.js';
import {
  adaptModelTemplateToApi,
  adaptInitialFieldOptionsToModel
} from '@/services/formTemplate';

const defaultState = {
  currentField: {},
  currentTemplate: { items: [] },

  templates: {} // [id]: {}, [id]: {}. (fetch from api only)
};

function generateEmptyTemplate() {
  return (() => ({
    draft: true,
    id: randomId(8),
    name: 'Untitled',
    items: []
  }))();
}

function generateEmptyField({ type, value, options }) {
  return (() => ({
    isRequired: false,
    draft: true,
    id: randomId(8),
    type,
    value,
    options: adaptInitialFieldOptionsToModel(options)
  }))();
}

const mutations = {
  templatesUpdate(state, payload) {
    state.templates = payload;
  },
  currentFieldUpdate(state, payload) {
    state.currentField = payload;
  },
  currentTemplateUpdate(state, payload) {
    state.currentTemplate = payload;
  }
};

const actions = {
  createDefaultTemplates(context, { params }) {
    return FormTemplateService.defaults(params);
  },
  hasAnyFormTemplates({ dispatch }, tenantSlug) {
    return dispatch('templatesFetch', { params: { tenantSlug } }).then(
      response => {
        return response.length > 0;
      }
    );
  },
  templatesFetch(context, { params }) {
    return FormTemplateService.formtemplates1(params).then(response => {
      const adaptedTemplates = adaptApiTemplatesToModel(response);
      context.commit('templatesUpdate', adaptedTemplates);
      return response;
    });
  },
  templateFetch(context, { params }) {
    return FormTemplateService.formtemplates4(params).then(response => {
      const adaptedTemplate = adaptApiTemplateToModel(response);
      console.log(
        'templateFetch...',
        response.items.map(item => item.value.substring(0, 1))
      );
      context.commit('currentTemplateUpdate', adaptedTemplate);
      return response;
    });
  },
  templateDelete(context, { params, isDraft = false }) {
    if (isDraft) {
      return true;
    }
    return FormTemplateService.formtemplates2(params);
  },
  currentFieldUpdate(context, payload) {
    context.commit('currentFieldUpdate', payload);
  },
  currentFieldClear(context) {
    context.commit('currentFieldUpdate', {});
  },
  currentFieldReset(context, field) {
    const newField = generateEmptyField(field);
    context.commit('currentFieldUpdate', newField);
    return newField;
  },
  currentTemplateUpdate(context, payload) {
    context.commit('currentTemplateUpdate', payload);
  },
  currentTemplateReset(context) {
    const newForm = generateEmptyTemplate();
    context.commit('currentTemplateUpdate', newForm);
    return newForm;
  },
  templateSave(context, { template, tenantSlug }) {
    const templateAdapted = adaptModelTemplateToApi(template);
    // post method
    let apiAction = FormTemplateService.formtemplates;
    if (!template.draft) {
      // put method
      apiAction = FormTemplateService.formtemplates3;
    }

    return apiAction({
      tenantSlug,
      templateId: template.id,
      body: templateAdapted
    }).then(templateId => {
      return templateId;
    });
  },
  fieldDelete({ getters, dispatch }, { fieldId, tenantSlug }) {
    const currentItems = getters.currentTemplateGet.items;
    const updatedItems = currentItems.filter(item => item.id !== fieldId);
    const updatedTemplate = {
      ...getters.currentTemplateGet,
      items: updatedItems
    };
    return dispatch('templateSave', { template: updatedTemplate, tenantSlug });
  },
  // TODO: rename formId to templateId everywhere
  async saveField({ getters, dispatch }, { field, formId, tenantSlug }) {
    const currentTemplate = getters.currentTemplateGet;
    if (String(currentTemplate.id) !== String(formId)) {
      alert(
        'If you have two open tabs please close the other and start again.'
      );
      return;
    }

    // update field in template with handling both add/edit
    let updatedFields = [];
    if (field.draft) {
      updatedFields = [...currentTemplate.items, field];
    } else {
      updatedFields = currentTemplate.items.map(item => {
        if (field.id === item.id) {
          return field;
        }
        return item;
      });
    }
    const updatedTemplate = {
      ...currentTemplate,
      items: updatedFields
    };
    return dispatch('templateSave', {
      template: updatedTemplate,
      tenantSlug
    });
  }
};
const getters = {
  currentFieldGet: state => state.currentField,
  currentTemplateGet: state => state.currentTemplate,
  templatesGet: state => state.templates
};

export default {
  namespaced: true,
  state: cloneDeep(defaultState),
  getters,
  actions,
  mutations
};
