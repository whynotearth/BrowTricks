<template>
  <!-- TODO rename sentences to disclosures (or something meaningful and more general) everywhere -->
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
            v-for="sentence in sentences"
            :key="sentence.key"
            ref="sentences"
          >
            <BaseEditor v-model.trim="sentence.value" />

            <a
              @click.prevent.stop="sentenceRemove(sentence.key)"
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
            v-if="sentences.length > 0"
            class="mb-2 border-white border-opacity-divider"
          />
          <a
            tabindex="0"
            @click="sentenceAdd"
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
import { mapActions, mapGetters } from 'vuex';
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
  data: () => ({
    sentences: []
  }),
  props: ['tenantSlug'],
  created() {
    this._pmuDisclosuresFetch();
  },
  computed: {
    ...mapGetters('tenant', ['pmuDisclosuresGet'])
  },
  methods: {
    ...mapActions('tenant', ['pmuDisclosuresFetch', 'pmuDisclosuresUpdate']),
    async _pmuDisclosuresFetch() {
      await this.pmuDisclosuresFetch({
        params: { tenantSlug: this.tenantSlug }
      });
      this.sentences = [...this.pmuDisclosuresGet].map(
        this.adaptSentenceForPage
      );
    },
    sentenceAdd() {
      let sentence = {
        value: null
      };
      sentence = this.adaptSentenceForPage(sentence);
      this.sentences.push(sentence);
    },
    sentenceRemove(key) {
      const index = this.sentences.findIndex(q => q.key === key);
      this.sentences.splice(index - 1, 1);
    },
    adaptSentenceForPage(sentence) {
      return {
        ...sentence,
        key: randomId()
      };
    },
    adaptSentencesForApi(sentences) {
      return sentences
        .filter(q => q.value.length > 0)
        .map(q => ({
          value: q.value,
          id: q.id
        }));
    },
    async submit() {
      try {
        const disclosures = this.adaptSentencesForApi(this.sentences);
        await this.pmuDisclosuresUpdate({
          params: {
            tenantSlug: this.tenantSlug,
            body: {
              disclosures
            }
          }
        });

        showOverlayAndRedirect({
          title: 'Saved Successfully!'
        });
      } catch (error) {
        alert('Something went wrong, Saving failed');
        console.log('error in setup pmu', error);
      }
    }
  }
};
</script>

<style scoped>
.slide {
  @apply bg-white;
}
</style>
