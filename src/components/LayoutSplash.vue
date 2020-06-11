<template>
  <div
    class="layout-splash h-full flex flex-col justify-end items-center p-4 pb-5 text-on-background-image"
  >
    <slot name="image" />
    <div class="tg-h1-mobile">
      <slot name="title" />
    </div>
    <div class="tg-body-mobile">
      <slot name="subtitle" />
    </div>
    <div class="tg-body-hyperlink-mobile text-secondary">
      <slot name="link" />
    </div>
    <slot name="primary-cta" />
    <slot name="secondary-cta" />
    <div class="tg-color-label-mobile text-error">
      <slot name="reject-cta" />
    </div>
    <div
      class="tg-body-hyperlink-mobile text-on-background-image text-opacity-medium"
    >
      <slot name="tertiary-cta" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutSplash'
};
</script>

<style scoped>
.layout-splash {
  background-image: url('https://res.cloudinary.com/whynotearth/image/upload/v1590460151/BrowTricks/Action_page_background_zlpen3.png');

  @apply bg-cover bg-no-repeat;
}
</style>
