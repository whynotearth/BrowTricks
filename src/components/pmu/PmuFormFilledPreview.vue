<template>
  <div class="max-w-4xl mx-auto mb-6" v-if="imagePreview">
    <h2
      v-if="title"
      class="tg-body-mobile mb-2 py-2 text-on-background text-opacity-high"
    >
      {{ title }}
    </h2>
    <img :src="imagePreview" alt="" />
  </div>
  <div v-else class="absolute w-screen h-full flex justify-center items-center">
    <BaseSpinner borderColor="border-brand2" classNames="spinner" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BaseSpinner from '@/components/BaseSpinner.vue';

export default {
  name: 'PmuFormFilledPreview',
  components: {
    BaseSpinner
  },
  props: {
    tenantSlug: [Number, String],
    templateId: [Number, String],
    title: String,
    clientId: [Number, String],
    answers: Object,
    isMock: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    imagePreview: ''
  }),
  created() {
    this._pmuFilledPreview();
  },
  methods: {
    ...mapActions('client', ['pmuFilledPreview']),
    ...mapActions('tenant', ['pmuFilledPreviewMock']),
    async _pmuFilledPreview() {
      const method = this.isMock
        ? this.pmuFilledPreviewMock
        : this.pmuFilledPreview;

      this.imagePreview = await method({
        params: {
          tenantSlug: this.tenantSlug,
          templateId: this.templateId,
          clientId: this.clientId,
          body: this.answers
        }
      });
    },
    init() {
      this._pmuFilledPreview();
    }
  }
};
</script>

<style scoped></style>
