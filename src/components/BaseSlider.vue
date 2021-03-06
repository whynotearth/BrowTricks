<template>
  <div>
    <div
      v-if="hasNavigation && slider"
      class="keen-slider__dots items-center justify-center px-2 py-0 flex mb-8"
    >
      <button
        v-for="(slide, idx) in dotHelper"
        @click="slider.moveToSlideRelative(idx)"
        class="keen-slider__dot my-1 mx-2 cursor-pointer rounded-full border-none transition-all duration-300"
        :class="{ active: current === idx }"
        :key="idx"
      ></button>
    </div>

    <div ref="slider" class="keen-slider">
      <!-- Add div elements with .keen-slider__slide classname as slide items -->
      <slot />
    </div>
  </div>
</template>

<script>
import 'keen-slider/keen-slider.min.css';
import KeenSlider from 'keen-slider';

export default {
  name: 'BaseSlider',
  computed: {
    dotHelper() {
      return this.slider ? [...Array(this.slider.details().size).keys()] : [];
    }
  },
  props: {
    hasNavigation: {
      type: Boolean,
      default: true
    },
    config: {
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      current: 0,
      slider: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      const defaultConfig = {
        // docs https://keen-slider.io/api/#api
        slidesPerView: 1,
        spacing: 8,
        centered: false,
        loop: false,

        initial: this.current,
        slideChanged: s => {
          this.current = s.details().relativeSlide;
          this.$emit('slideChange', this.current);
        }
      };
      const sliderConfig = { ...defaultConfig, ...this.config };
      this.slider = new KeenSlider(this.$refs.slider, sliderConfig);
    },
    goStep(index) {
      this.slider.moveToSlideRelative(index);
    }
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

.keen-slider__dot {
  width: 6px;
  height: 6px;
}

.keen-slider__dot:focus {
  outline: none;
}

.keen-slider__dot.active {
  transform: scale(2);
}
.keen-slider__dot {
  @apply bg-secondary;
}
.keen-slider__dot.active {
  @apply bg-brand4;
}
</style>
