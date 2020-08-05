<template>
  <div class="text-left p-2">
    <!-- <h2 class="tg-body-mobile text-black text-opacity-medium mb-6 py-2">
      Here is your pre-set PMU form:
    </h2>
    <div class="max-w-md mx-auto mb-6">
      <BaseSlider>
        <div class="slide keen-slider__slide">1</div>
        <div class="slide keen-slider__slide">
          <img src="http://placehold.it/500x100" alt="" />
        </div>
        <div class="slide keen-slider__slide">
          <img src="http://placehold.it/500x100" alt="" />
        </div>
        <div class="slide keen-slider__slide">4</div>
      </BaseSlider>
    </div>

    <hr /> -->

    <h2 class="tg-h2-mobile text-black text-opacity-high my-6">
      Add Custom Questions
    </h2>

    <div class="bg-surface shadow-1dp py-4 mb-4 rounded-lg px-4">
      <div
        class="flex items-center pb-4 w-full"
        v-for="question in questions"
        :key="question.id"
        ref="questions"
      >
        <MaterialInput
          class="flex-grow"
          v-model.trim="question.value"
          label="Question"
          labelBg="bg-surface"
          :margin="null"
        >
        </MaterialInput>
        <a @click.prevent.stop="questionRemove" href="#" class="ml-4">
          <IconDelete class="text-black text-opacity-disabled w-6 h-6" />
        </a>
      </div>

      <hr v-if="questions.length > 0" class="mb-2" />
      <a
        @click="questionAdd"
        class="text-secondary tg-color-label-mobile text-center py-2 w-full block cursor-pointer"
        >Add Question</a
      >
    </div>

    <Button class="rounded-full" @clicked="submit" title="Get Started"></Button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
// import BaseSlider from '@/components/BaseSlider.vue';
import Button from '@/components/Button.vue';
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import IconDelete from '@/assets/icons/delete.svg';
import { randomId } from '@/helpers';

export default {
  name: 'PmuSign',
  components: {
    // BaseSlider,
    Button,
    MaterialInput,
    IconDelete
  },
  props: ['tenantSlug', 'clientId'],
  data: () => ({
    questions: []
  }),
  methods: {
    // ...mapMutations('PMU', [''])
    ...mapActions('PMU', ['setCustomQuestions', 'submitSign']),
    questionAdd() {
      const question = {
        id: randomId(),
        value: null
      };
      this.questions.push(question);

      this.$nextTick(() => {
        this.$refs.questions[this.questions.length - 1]
          .querySelector('input')
          .focus();
      });
    },
    questionRemove(id) {
      const index = this.questions.findIndex(q => q.id === id);
      this.questions.splice(index - 1, 1);
    },
    async submit() {
      const questions = this.prepareQuestions();
      const signUrl = await this.setCustomQuestions({
        params: {
          tenantSlug: this.tenantSlug,
          clientId: this.clientId,
          body: {
            questions
          }
        }
      });

      console.log('signUrl', signUrl);
      this.submitSign(signUrl);
    },
    prepareQuestions() {
      return this.questions.filter(q => q.value.length > 0).map(q => q.value);
    }
  }
};
</script>

<style scoped>
.slide {
  @apply bg-white;
}
</style>
