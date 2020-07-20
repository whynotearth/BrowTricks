<template>
  <div>
    <LayoutFixedScrollable>
      <BaseHeader slot="header" class="text-on-background-image bg-secondary">
        <IconMenu slot="icon" class="h-6 w-6 fill-current" />
        <span slot="content" class="pl-5">Menu</span>
      </BaseHeader>
      <LayoutSplash slot="content">
        <img
          slot="image"
          src="https://res.cloudinary.com/whynotearth/image/upload/v1585738962/BrowTricks/LOG_IN_alwajv.png"
          class="w-40 h-45 pb-14"
        />
        <div slot="title" class="pb-4">Brow Tricks Beauty</div>
        <div slot="subtitle" class="pb-4">This is a test</div>
        <div slot="link" class="pb-4">This is a test</div>
        <div slot="primary-cta" class="w-full pb-4">
          <BaseButton class="bg-secondary">
            <span slot="cta-text">Start Setting Up Your Business</span>
          </BaseButton>
        </div>
        <div slot="secondary-cta" class="w-full pb-6">
          <BaseButton class="bg-secondary">
            <span slot="cta-text">Start Setting Up Your Business</span>
          </BaseButton>
        </div>
        <div slot="reject-cta" class="pb-4">Cancel Action</div>
        <div slot="tertiary-cta">
          No account? Sign Up For Brow Tricks Beauty!
        </div>
      </LayoutSplash>
    </LayoutFixedScrollable>
  </div>
</template>

<script>
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import LayoutSplash from '@/layouts/LayoutSplash.vue';
import BaseButton from '@/components/BaseButton.vue';
import IconMenu from '@/assets/icons/menu.svg';

export default {
  name: 'TestLayoutSplash',
  components: {
    LayoutFixedScrollable,
    BaseHeader,
    LayoutSplash,
    BaseButton,
    IconMenu
  }
};
</script>
