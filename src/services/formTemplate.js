export const fieldModelToFieldTypeCard = field => {
  switch (field.type) {
    case 'image':
      return {
        ...field,
        icon: 'IconImages',
        title: 'Upload'
      };

    case 'agreement_request':
      return {
        ...field,
        icon: 'IconCheckSquared',
        title: 'Agreement Request'
      };

    case 'text_response':
      return {
        ...field,
        icon: 'IconText',
        title: 'Text Response'
      };

    // TODO: no design? (probably just like simple yes)
    case 'text':
      return {
        ...field,
        icon: 'IconText',
        title: 'Text'
      };

    case 'checklist':
      return {
        ...field,
        icon: 'IconChecklist',
        title: 'Checklist'
      };

    case 'multiple_choice':
      return {
        ...field,
        icon: 'IconRadiolist',
        title: 'Multiple Choice'
      };

    default:
      console.log('Field type is unknown');
      break;
  }
};
