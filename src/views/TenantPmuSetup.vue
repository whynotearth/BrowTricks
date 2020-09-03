<template>
  <!-- TODO rename sentences to disclosures (or something meaningful and more general) everywhere -->
  <div class="max-w-4xl mx-auto px-4 pt-4">
    <div class="text-left p-2 text-on-background">
      <template>
        <div class="preview" v-if="shouldShowPreview">
          <TenantPmuPreview
            title="Here is your pre-set PMU form:"
            :tenantSlug="tenantSlug"
          />
        </div>

        <hr class="border-white border-opacity-divider mb-6" />

        <h2 class="tg-h2-mobile text-on-background text-opacity-high mb-6">
          Add Your Disclosures
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
          class="rounded-full my-6"
          @clicked="submit"
          title="Save"
        ></Button>

        <Button
          @clicked="cancel"
          title="Cancel"
          theme="none"
          class="rounded-full mb-6 text-on-background text-opacity-medium"
        ></Button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseEditor from '@/components/inputs/BaseEditor.vue';
import Button from '@/components/inputs/Button.vue';
import TenantPmuPreview from '@/components/pmu/TenantPmuPreview.vue';
import IconDelete from '@/assets/icons/delete.svg';
import { randomId, showOverlayAndRedirect } from '@/helpers';

export default {
  name: 'TenantPmuSetup',
  components: {
    BaseEditor,
    TenantPmuPreview,
    Button,
    IconDelete
  },
  data: () => ({
    sentences: [],
    isLoading: false
  }),
  props: ['tenantSlug'],
  created() {
    this.init();
  },
  computed: {
    ...mapGetters('tenant', ['pmuDisclosuresGet']),
    shouldShowPreview() {
      return this.sentences.length > 0 && !this.isLoading;
    }
  },
  // TODO: fetch again after submit
  methods: {
    ...mapActions('tenant', ['pmuDisclosuresFetch', 'pmuDisclosuresUpdate']),
    init() {
      this._pmuDisclosuresFetch();
    },
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
        this.isLoading = true;
        const disclosures = this.adaptSentencesForApi(this.sentences);
        await this.pmuDisclosuresUpdate({
          params: {
            tenantSlug: this.tenantSlug,
            body: {
              disclosures
            }
          }
        });

        this.init();
        this.isLoading = false;

        showOverlayAndRedirect({
          title: 'Saved Successfully!'
        });
      } catch (error) {
        alert('Something went wrong, Saving failed');
        console.log('error in setup pmu', error);
      }
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.slide {
  @apply bg-white;
}
</style>
