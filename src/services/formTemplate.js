// adapt vue template to api model
export const adaptTemplateToApi = template => {
  const items = template.items.map(fieldModelToApiField);
  const id = template.draft ? undefined : template.id;
  return {
    ...template,
    draft: undefined,
    id,
    items,
    type: 'disclosure'
  };
};

// adapt api templates to Vue model
export const adaptAndFilterApiTemplatesToModel = templates => {
  return templates
    .filter(template => template.id)
    .map(template => {
      let items = template.items.map(adaptApiTemplateFieldItemToModelCard);
      return {
        ...template,
        items
      };
    });
};

// adapt vue field to api field
export const fieldModelToApiField = item => {
  const id = item.draft ? undefined : item.id;
  return { ...item, id, icon: undefined, title: undefined, draft: undefined };
};

// adapt template.items of API to Vue model
export const adaptApiTemplateFieldItemToModelCard = item => {
  switch (item.type) {
    case 'image':
      return {
        ...item,
        icon: 'IconImages',
        title: 'Upload'
      };

    case 'agreement_request':
      return {
        ...item,
        icon: 'IconCheckSquared',
        title: 'Agreement Request'
      };

    case 'text_response':
      return {
        ...item,
        icon: 'IconText',
        title: 'Text Response'
      };

    // TODO: no design? (probably just like simple yes)
    case 'text':
      return {
        ...item,
        icon: 'IconText',
        title: 'Text'
      };

    case 'checklist':
      return {
        ...item,
        icon: 'IconChecklist',
        title: 'Checklist'
      };

    case 'multiple_choice':
      return {
        ...item,
        icon: 'IconRadiolist',
        title: 'Multiple Choice'
      };

    default:
      console.log('Field type is unknown', item);
      break;
  }
};
