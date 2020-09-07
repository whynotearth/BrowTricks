export const fieldModelToFieldTypeCard = field => {
  switch (field.type) {
    case 'upload':
      return {
        ...field,
        icon: 'IconImages',
        title: 'Upload'
      };

    case 'agreement':
      return {
        ...field,
        icon: 'IconCheckSquared',
        title: 'Agreement Request'
      };

    case 'textarea':
      return {
        ...field,
        icon: 'IconText',
        title: 'Text Response'
      };

    case 'checkbox':
      return {
        ...field,
        icon: 'IconChecklist',
        title: 'Checklist'
      };

    case 'radio':
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
