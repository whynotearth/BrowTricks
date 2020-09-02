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
  name: 'PmuPreSignPreview',
  props: ['clientId', 'tenantSlug', 'title'],
  data: () => ({
    imagePreview: ''
  }),
  created() {
    this._pmuPreSignPreview();
  },
  methods: {
    ...mapActions('client', ['pmuPreSignPreview']),
    async _pmuPreSignPreview() {
      this.imagePreview = await this.pmuPreSignPreview({
        params: {
          clientId: this.clientId,
          tenantSlug: this.tenantSlug
        }
      });
    },
    init() {
      this._pmuPreSignPreview();
    }
  }
};
</script>

<style scoped></style>
