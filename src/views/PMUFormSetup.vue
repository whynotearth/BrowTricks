<template>
  <div>
    <div class="max-w-md mx-auto">
      <BaseSlider>
        <div class="keen-slider__slide">1</div>
        <div class="keen-slider__slide">
          <img src="http://placehold.it/500x600" alt="" />
        </div>
        <div class="keen-slider__slide">
          <img src="http://placehold.it/500x200" alt="" />
        </div>
        <div class="keen-slider__slide">4</div>
      </BaseSlider>
    </div>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex';
import BaseSlider from '@/components/BaseSlider.vue';

export default {
  name: 'PMUFormSetup',
  components: { BaseSlider },
  methods: {
    // ...mapMutations('PMU', [''])
  },
  destroyed() {
    this.resetCreateTenantForm();
  }
};
</script>
