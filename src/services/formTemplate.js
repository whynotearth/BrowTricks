export const adaptAndFilterTemplates = templates => {
  return templates
    .filter(template => template.id)
    .map(template => {
      let items = template.items.map(fieldModelToFieldTypeCard);
      return {
        ...template,
        items
      };
    });
};

// adapt template.items of API to Vue model
export const fieldModelToFieldTypeCard = item => {
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
