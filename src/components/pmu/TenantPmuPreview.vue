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
  name: 'TenantPmuPreview',
  props: ['tenantSlug', 'title'],
  data: () => ({
    imagePreview: ''
  }),
  created() {
    console.log('tenant pmu preview...');
    this._tenantPmuPreview();
  },
  methods: {
    ...mapActions('tenant', ['tenantPmuPreview']),
    async _tenantPmuPreview() {
      this.imagePreview = await this.tenantPmuPreview({
        params: {
          tenantSlug: this.tenantSlug
        }
      });
    },
    init() {
      this._tenantPmuPreview();
    }
  }
};
</script>

<style scoped></style>
