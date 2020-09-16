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
  <p v-else class="tg-body-mobile text-on-background text-opacity-medium">
    Generating a preview...
  </p>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'PmuFormFilledPreview',
  props: ['tenantSlug', 'templateId', 'title', 'clientId'],
  data: () => ({
    imagePreview: ''
  }),
  created() {
    this._pmuFilledPreview();
  },
  methods: {
    ...mapActions('client', ['pmuFilledPreview']),
    async _pmuFilledPreview() {
      this.imagePreview = await this.pmuFilledPreview({
        params: {
          tenantSlug: this.tenantSlug,
          templateId: this.templateId,
          clientId: this.clientId
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
