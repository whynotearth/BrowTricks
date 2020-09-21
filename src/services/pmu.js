// types are: image,pdf,agreement_request,text_response,text,checklist,multiple_choice,

import { isArray } from 'lodash-es';
import { getCloudinaryThumbnail } from '@/helpers.js';
import {
  QuestionModel,
  QuestionType,
  ChoiceOption
} from '@whynotearth/vue-flow-form';

export const adaptApiQuestionsToModel = questions => {
  // sample: https://github.com/ditdot-dev/vue-flow-form/blob/master/examples/questionnaire/Example.vue
  return questions.map(question => {
    let adapted;
    switch (question.type) {
      case 'text':
      case 'text_response':
        adapted = new QuestionModel({
          questionId: question.id,
          id: `question__${question.id}`,
          title: question.value,
          required: question.isRequired,
          type: QuestionType.LongText
          // placeholder:
        });
        break;

      case 'multiple_choice':
        adapted = new QuestionModel({
          multiple: false,
          questionId: question.id,
          id: `question__${question.id}`,
          title: question.value,
          required: question.isRequired,
          type: QuestionType.MultipleChoice,
          allowOther: false,
          options: question.options.map(option => {
            return new ChoiceOption({
              label: option,
              value: option
            });
          })
        });
        break;

      case 'checklist':
        adapted = new QuestionModel({
          multiple: true,
          questionId: question.id,
          id: `question__${question.id}`,
          title: question.value,
          required: question.isRequired,
          type: QuestionType.MultipleChoice,
          allowOther: false,
          options: question.options.map(option => {
            return new ChoiceOption({
              label: option,
              value: option
            });
          })
        });
        break;

      case 'pdf':
        adapted = new QuestionModel({
          questionId: question.id,
          id: `question__${question.id}`,
          title: question.value,
          required: question.isRequired,
          // content: 'No content',
          // description: 'No description',
          image: getCloudinaryThumbnail(question.options[0]),
          type: QuestionType.SectionBreak
        });
        break;

      case 'image':
        adapted = new QuestionModel({
          questionId: question.id,
          id: `question__${question.id}`,
          title: question.value,
          required: question.isRequired,
          // content: 'No content',
          // description: 'No description',
          image: question.options[0],
          type: QuestionType.SectionBreak
        });
        break;

      case 'agreement_request':
        adapted = new QuestionModel({
          questionId: question.id,
          id: `question__${question.id}`,
          title: question.value,
          required: question.isRequired,
          // content: 'No content',
          // description: 'No description',
          type: QuestionType.SectionBreak
        });
        break;

      default:
        console.log('Type not found', question.type);
        break;
    }
    return adapted;
  });
};

export const adaptAnswersToApi = (questionList, callbackUrl) => {
  return {
    notificationCallBackUrl: callbackUrl,
    answers: questionList.map(question => {
      return {
        formItemId: question.questionId,
        value: isArray(question.answer) ? question.answer : [question.answer]
      };
    })
  };
};
