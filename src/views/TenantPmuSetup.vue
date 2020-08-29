<template>
  <!-- TODO rename questions to disclosures (or something meaningful and more general) everywhere -->
  <div class="max-w-4xl mx-auto px-4">
    <div class="text-left p-2 text-on-background">
      <template>
        <h2
          class="tg-body-mobile mb-2 py-2 text-on-background text-opacity-high"
        >
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

        <hr class="border-white border-opacity-divider mb-6" />

        <h2 class="tg-h2-mobile text-on-background text-opacity-high mb-6">
          Add Custom Disclosures
        </h2>

        <div class="bg-surface shadow-1dp py-4 mb-4 rounded-lg px-4">
          <div
            class="flex flex-col items-center pb-4 w-full"
            v-for="question in questions"
            :key="question.id"
            ref="questions"
          >
            <BaseEditor v-model.trim="question.value" />

            <a
              @click.prevent.stop="questionRemove"
              href="#"
              class="flex justify-end w-full"
              title="Delete the above disclosure"
            >
              <IconDelete
                class="text-on-background text-opacity-medium w-6 h-6"
              />
            </a>
          </div>

          <hr
            v-if="questions.length > 0"
            class="mb-2 border-white border-opacity-divider"
          />
          <a
            tabindex="0"
            @click="questionAdd"
            class="text-primary tg-color-label-mobile text-center py-2 w-full block cursor-pointer"
            >Add Disclosure</a
          >
        </div>

        <Button
          class="rounded-full mb-6 "
          @clicked="submit"
          title="Save"
        ></Button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BaseSlider from '@/components/BaseSlider.vue';
import Button from '@/components/inputs/Button.vue';
// import MaterialInput from '@/components/inputs/MaterialInput.vue';
import BaseEditor from '@/components/inputs/BaseEditor.vue';
import IconDelete from '@/assets/icons/delete.svg';
import { randomId, showOverlayAndRedirect } from '@/helpers';

export default {
  name: 'TenantPmuSetup',
  components: {
    BaseEditor,
    BaseSlider,
    Button,
    // MaterialInput,
    IconDelete
  },
  props: ['tenantSlug', 'clientId'],

  data: () => ({
    questions: [],
    client: null
  }),
  computed: {
    pmuPdfUrl() {
      if (!this.client) {
        return null;
      }
      return this.client.pmuPdfUrl;
    },
    isPmuIncomplete() {
      if (!this.client) {
        return false;
      }
      return this.client.pmuStatus === 'incomplete';
    }
  },
  methods: {
    ...mapActions('PMU', ['setCustomQuestions']),

    async _fetchClient() {
      this.client = await this.fetchClient({
        params: {
          clientId: this.clientId,
          tenantSlug: this.tenantSlug
        }
      }).catch(() => {
        console.log('error in getting client');
      });
    },
    questionAdd() {
      const question = {
        id: randomId(),
        value: null
      };
      this.questions.push(question);

      // this.$nextTick(() => {
      //   this.$refs.questions[this.questions.length - 1]
      //     .querySelector('input')
      //     .focus();
      // });
    },
    questionRemove(id) {
      const index = this.questions.findIndex(q => q.id === id);
      this.questions.splice(index - 1, 1);
    },
    async submit() {
      try {
        const questions = this.prepareQuestions();
        await this.setCustomQuestions({
          params: {
            tenantSlug: this.tenantSlug,
            clientId: this.clientId,
            body: {
              disclosures: questions
            }
          }
        });

        showOverlayAndRedirect({
          title: 'Signed Successfully!',
          route: { name: 'ClientEdit' }
        });
      } catch (error) {
        alert('Something went wrong, Signing failed');
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
