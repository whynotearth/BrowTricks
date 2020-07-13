<template>
  <div ref="slider" class="keen-slider">
    <!-- Add div elements with .keen-slider__slide classname as slide items -->
    <slot />
  </div>
</template>

<script>
import 'keen-slider/keen-slider.min.css';
import KeenSlider from 'keen-slider';

export default {
  name: 'BaseSlider',
  mounted() {
    this.slider = new KeenSlider(this.$refs.slider);
  },
  beforeDestroy() {
    if (this.slider) this.slider.destroy();
  }
};
</script>

<style>
.keen-slider__slide {
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 100vh;
}
</style>
