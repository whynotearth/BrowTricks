import { cloneDeep } from 'lodash-es';
import { randomId } from '@/helpers.js';
import { FormTemplateService } from '@whynotearth/meredith-axios';
import { adaptAndFilterTemplates } from '@/services/formTemplate.js';

const defaultState = {
  currentField: {},
  currentTemplate: {},

  templates: {} // [id]: {}, [id]: {}. (fetch from api only)
};

function generateEmptyTemplate() {
  return (() => ({
    draft: true,
    id: randomId(8),
    title: 'Untitled',
    items: []
  }))();
}

function generateEmptyField(type) {
  return (() => ({
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
      const filteredAdaptedTemplates = adaptAndFilterTemplates(response);
      console.log('response', response);
      context.commit('templatesUpdate', filteredAdaptedTemplates);
    });
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
  saveField({ getters, commit }, { field, formId }) {
    const currentTemplate = getters.currentTemplateGet;
    if (String(currentTemplate.id) !== String(formId)) {
      alert(
        'If you have two open tabs please close the other and start again.'
      );
      return;
    }

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
    // TODO: save template to api here, then:
    commit('currentTemplateUpdate', updatedTemplate);
    console.log('in save store:', field, formId);
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
