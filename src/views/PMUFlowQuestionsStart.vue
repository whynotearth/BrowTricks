<template>
  <div>
    <LayoutFixedScrollable>
      <LayoutSplash slot="content">
        <img
          slot="image"
          src="https://res.cloudinary.com/whynotearth/image/upload/v1585738963/BrowTricks/_0003_MANAGE-CLIENTS_hl5cux.png"
          class="w-40 h-45"
        />
        <div slot="title">
          <span>Brow Tricks Beauty PMU Form</span>
        </div>
        <div slot="subtitle">
          Brow Tricks Beauty needs the following paperwork to be completed
          before your appointment. It should take about 5 minutes.
        </div>
        <div slot="primaryCTA">
          <Button
            :to="{ name: 'PMUFlowQuestionsSteps' }"
            class="mb-4"
            title="Get Started"
            :isRounded="true"
            :isRipple="false"
          />
        </div>
      </LayoutSplash>
    </LayoutFixedScrollable>
  </div>
</template>

<script>
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import LayoutSplash from '@/layouts/LayoutSplash.vue';
// import BaseButton from '@/components/BaseButton.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'PMUFlowQuestionsStart',
  components: {
    LayoutFixedScrollable,
    LayoutSplash,
    Button
  }
};
</script>
