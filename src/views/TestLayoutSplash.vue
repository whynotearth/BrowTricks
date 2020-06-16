<template>
  <div>
    <LayoutFixedScrollable>
      <LayoutSplash slot="content">
        <img
          slot="image"
          src="https://res.cloudinary.com/whynotearth/image/upload/v1585738962/BrowTricks/LOG_IN_alwajv.png"
          class="w-40 h-45 pb-14"
        />
        <div slot="title">Brow Tricks Beauty</div>
        <div slot="subtitle">This is a test</div>
        <div slot="link">This is a test</div>
        <div slot="primary-cta" class="w-full">
          <BaseButton class="bg-secondary">
            <span slot="cta-text">Start Setting Up Your Business</span>
          </BaseButton>
        </div>
        <div slot="secondary-cta" class="w-full">
          <BaseButton class="bg-secondary">
            <span slot="cta-text">Start Setting Up Your Business</span>
          </BaseButton>
        </div>
        <div slot="reject-cta">Cancel Action</div>
        <div slot="tertiary-cta">
          No account? Sign Up For Brow Tricks Beauty!
        </div>
      </LayoutSplash>
    </LayoutFixedScrollable>
  </div>
</template>

<script>
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import LayoutSplash from '@/components/LayoutSplash.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'TestLayoutSplash',
  components: {
    LayoutFixedScrollable,
    LayoutSplash,
    BaseButton
  }
};
</script>
