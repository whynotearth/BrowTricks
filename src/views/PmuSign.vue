<template>
  <div class="text-left p-2">
    <h2 class="tg-body-mobile mb-6 py-2">
      Here is your pre-set PMU form:
    </h2>
    <div class="max-w-md mx-auto mb-6">
      <BaseSlider>
        <div class="slide keen-slider__slide">
          <img
            src="https://res.cloudinary.com/whynotearth/image/upload/v1596652148/BrowTricks/static_v2/pmu-default-form-p1_yuk6bh.jpg"
            alt=""
          />
        </div>
        <div class="slide keen-slider__slide">
          <img
            src="https://res.cloudinary.com/whynotearth/image/upload/v1596652147/BrowTricks/static_v2/pmu-default-form-p2_r8a4yj.jpg"
            alt=""
          />
        </div>
      </BaseSlider>
    </div>

    <hr class="border-white border-opacity-divider" />

    <h2 class="tg-h2-mobile text-white text-opacity-high my-6">
      Add Custom Questions
    </h2>

    <div class="surface-dm shadow-1dp py-4 mb-4 rounded-lg px-4">
      <div
        class="flex items-center pb-4 w-full"
        v-for="question in questions"
        :key="question.id"
        ref="questions"
      >
        <MaterialInput
          theme="dark"
          class="flex-grow"
          v-model.trim="question.value"
          label="Question"
          labelBg="bg-surface"
          :margin="null"
        >
        </MaterialInput>
        <a @click.prevent.stop="questionRemove" href="#" class="ml-4">
          <IconDelete class="text-white text-opacity-disabled w-6 h-6" />
        </a>
      </div>

      <hr
        v-if="questions.length > 0"
        class="mb-2 border-white border-opacity-divider"
      />
      <a
        @click="questionAdd"
        class="text-newsecondary tg-color-label-mobile text-center py-2 w-full block cursor-pointer"
        >Add Question</a
      >
    </div>

    <Button
      class="rounded-full mb-6 "
      @clicked="submit"
      title="Get Started"
    ></Button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BaseSlider from '@/components/BaseSlider.vue';
import Button from '@/components/inputs/Button.vue';
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import IconDelete from '@/assets/icons/delete.svg';
import { randomId, showOverlayAndRedirect } from '@/helpers';

export default {
  name: 'PmuSign',
  components: {
    BaseSlider,
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
      try {
        const questions = this.prepareQuestions();
        const signUrl = await this.setCustomQuestions({
          params: {
            tenantSlug: this.tenantSlug,
            clientId: this.clientId,
            body: {
              disclosures: questions
            }
          }
        });

        console.log('signUrl', signUrl);
        const result = await this.submitSign(signUrl);
        console.log('submitSign result', result);

        showOverlayAndRedirect({
          title: 'Signed Successfully!',
          route: { name: 'ClientDetail' }
        });
      } catch (error) {
        alert("Something went wrong, Signing failed");
        console.log('error in sign flow', error);
      }
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
