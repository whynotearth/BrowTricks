import { randomId } from '@/helpers.js';

// adapt templates
// api => vue
export const adaptApiTemplatesToModel = templates => {
  return (
    templates
      // .filter(template => template.id)
      .map(adaptApiTemplateToModel)
  );
};

// adapt template
// vue => api
export const adaptModelTemplateToApi = template => {
  const items = template.items.map(fieldModelToApiField);
  return {
    ...template,
    id: undefined,
    draft: undefined,
    createdAt: undefined,
    items,
    // FIXME: set disclosure when it's the first time
    type: template.type || 'custom'
  };
};

// adapt template
// api => vue
export const adaptApiTemplateToModel = template => {
  let items = template.items.map(adaptApiTemplateFieldItemToModelCard);
  return {
    ...template,
    items
  };
};

// adapt fieldItem
// vue => api
export const fieldModelToApiField = item => {
  const adaptOption = option => option.value;

  const { type, isRequired, value, options = [] } = item;
  let _options = options.map(adaptOption);
  _options = _options.length > 0 ? _options : undefined;
  return {
    type,
    isRequired,
    value,
    options: _options
  };
};

// adapt fieldItem
// api => vue
export const adaptApiTemplateFieldItemToModelCard = item => {
  const adaptOption = option => ({
    value: option,
    key: randomId(),
    fromApiToVue: 1
  });

  let field = {
    ...item,
    options: (item.options || []).map(adaptOption)
  };
  switch (item.type) {
    case 'image':
      field = {
        ...field,
        icon: 'IconImages',
        title: 'Upload'
      };
      break;

    case 'pdf':
      field = {
        ...field,
        icon: 'IconDocument',
        title: 'Upload'
      };
      break;

    case 'agreement_request':
      field = {
        ...field,
        icon: 'IconCheckSquared',
        title: 'Agreement Request'
      };
      break;

    case 'text_response':
      field = {
        ...field,
        icon: 'IconText',
        title: 'Text Response'
      };
      break;

    // TODO: no design? (probably just like simple yes)
    case 'text':
      field = {
        ...field,
        icon: 'IconText',
        title: 'Text'
      };
      break;

    case 'checklist':
      field = {
        ...field,
        icon: 'IconChecklist',
        title: 'Checklist'
      };
      break;

    case 'multiple_choice':
      field = {
        ...field,
        icon: 'IconRadiolist',
        title: 'Multiple Choice'
      };
      break;

    default:
      console.log('Field type is unknown', item);
      break;
  }
  return field;
};
