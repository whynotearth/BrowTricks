<template>
  <div
    class="bg-primary shadow-4dp py-1 flex items-center sticky inset-x-0 top-0 z-10"
  >
    <div class="relative">
      <svg class="w-20 h-20 text-inactive">
        <circle
          :cx="centerX"
          :cy="centerY"
          :r="radius"
          fill="transparent"
          stroke="white"
          style="stroke-opacity: .38;"
        />
        <circle
          class="text-secondary progress-bar"
          :cx="centerX"
          :cy="centerY"
          :r="radius"
          fill="transparent"
          stroke="white"
          style="stroke-opacity: .84;"
          :stroke-dasharray="strokeDashArray"
        />
      </svg>
      <div
        class="progress-ring-inner text-white text-opacity-high tg-caption-mobile whitespace-no-wrap absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        {{ pageProgress }}
      </div>
    </div>
    <div class="flex-grow text-right leading-tight p-4">
      <h3 class="tg-h2-mobile text-white font-bold">
        {{ pageHeader(page) }}
      </h3>
      <h4
        v-if="pageSubheader(page)"
        class="tg-body-mobile text-white text-opacity-medium mt-2"
      >
        {{ pageSubheader(page) | formatPageSubHeader }}
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutStepper',
  props: {
    navigation: {
      type: Array
    },
    page: {
      type: Number
    }
  },
  data() {
    return {
      radius: 32,
      centerX: 40,
      centerY: 40
    };
  },
  methods: {
    pageHeader(pageNum) {
      return this.navigation[pageNum - 1].name;
    },
    pageSubheader(pageNum) {
      return this.navigation[pageNum] ? this.pageHeader(pageNum + 1) : '';
    }
  },
  computed: {
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    percentageProgress() {
      const pageProgressPercentage = this.page / this.pageCount;
      return this.circumference * pageProgressPercentage;
    },
    strokeDashArray() {
      return `${this.percentageProgress} ${this.circumference}`;
    },
    pageProgress() {
      return `${this.page} of ${this.pageCount}`;
    },
    pageCount() {
      return this.navigation.length;
    }
  },
  filters: {
    formatPageSubHeader(subheader) {
      return subheader ? `Next: ${subheader}` : '';
    }
  }
};
</script>

<style scoped>
svg {
  transform: rotate(-90deg);
  stroke-width: 0.25rem;
}

svg .progress-bar {
  transition: stroke-dasharray 0.5s ease-in-out;
}
</style>
