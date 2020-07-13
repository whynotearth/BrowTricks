<template>
  <div class="text-left p-2">
    <h2 class="tg-body-mobile text-black text-opacity-medium mb-6 py-2">
      Here is your pre-set PMU form:
    </h2>
    <div class="max-w-md mx-auto mb-6">
      <BaseSlider>
        <div class="slide keen-slider__slide">1</div>
        <div class="slide keen-slider__slide">
          <img src="http://placehold.it/500x600" alt="" />
        </div>
        <div class="slide keen-slider__slide">
          <img src="http://placehold.it/500x200" alt="" />
        </div>
        <div class="slide keen-slider__slide">4</div>
      </BaseSlider>
    </div>

    <hr class="mb-6" />

    <h2>Add Custom Questions</h2>

    questions 1 <br />
    questions 2 <br />
    questions 3 <br />

    add questions <br />

    <Button title="save PMU form"></Button>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex';
import BaseSlider from '@/components/BaseSlider.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'PMUFormSetup',
  components: { BaseSlider, Button },
  methods: {
    // ...mapMutations('PMU', [''])
  },
  destroyed() {
    this.resetCreateTenantForm();
  }
};
</script>

<style scoped>
.slide {
  @apply bg-white;
}
</style>
