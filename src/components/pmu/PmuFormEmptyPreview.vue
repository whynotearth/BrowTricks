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
  name: 'PmuFormEmptyPreview',
  props: ['tenantSlug', 'templateId', 'title'],
  data: () => ({
    imagePreview: ''
  }),
  created() {
    this._pmuEmptyPngPreview();
  },
  methods: {
    ...mapActions('client', ['pmuEmptyPngPreview']),
    async _pmuEmptyPngPreview() {
      this.imagePreview = await this.pmuEmptyPngPreview({
        params: {
          tenantSlug: this.tenantSlug,
          templateId: this.templateId
        }
      }).catch(error => {
        console.log(error);
        alert('Something went wrong in generating image preview');
      });
    }
  }
};
</script>

<style scoped></style>
