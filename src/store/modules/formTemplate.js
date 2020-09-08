import { cloneDeep } from 'lodash-es';
import { randomId } from '@/helpers.js';
import { FormTemplateService } from '@whynotearth/meredith-axios';
import { adaptAndFilterApiTemplatesToModel } from '@/services/formTemplate.js';
import { adaptTemplateToApi } from '../../services/formTemplate';

const defaultState = {
  currentField: {},
  currentTemplate: {},

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

function generateEmptyField(type) {
  return (() => ({
    isRequired: false,
    draft: true,
    id: randomId(8),
    type
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
  templatesFetch(context, { params }) {
    return FormTemplateService.formtemplates1(params).then(response => {
      const filteredAdaptedTemplates = adaptAndFilterApiTemplatesToModel(
        response
      );
      context.commit('templatesUpdate', filteredAdaptedTemplates);
    });
  },
  templateFetch(context, { params }) {
    return FormTemplateService.formtemplates3(params);
  },
  templateDelete(context, { params, isDraft = false }) {
    if (isDraft) {
      return true;
    }
    return FormTemplateService.formtemplates4(params);
  },
  currentFieldUpdate(context, payload) {
    context.commit('currentFieldUpdate', payload);
  },
  currentFieldReset(context, type) {
    const newField = generateEmptyField(type);
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
    const templateAdapted = adaptTemplateToApi(template);
    // post method
    let apiAction = FormTemplateService.formtemplates2;
    if (template.draft) {
      // put method
      apiAction = FormTemplateService.formtemplates;
    }
    apiAction({
      tenantSlug,
      body: templateAdapted
    });
  },
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
    return dispatch('templateSave', { template: updatedTemplate, tenantSlug });
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
