<template>
  <div
    class="layout-splash h-full flex flex-col justify-end items-center p-4 pb-10 text-on-background-image"
  >
    <slot name="image" />
    <div class="tg-h1-mobile pb-4">
      <slot name="title" />
    </div>
    <div class="tg-body-mobile pb-4">
      <slot name="subtitle" />
    </div>
    <div class="tg-body-hyperlink-mobile text-secondary pb-4">
      <slot name="link" />
    </div>
    <div class="pb-4"><slot name="primary-cta" /></div>
    <div class="pb-4"><slot name="secondary-cta" /></div>
    <div class="tg-color-label-mobile text-error pb-4">
      <slot name="reject-cta" />
    </div>
    <div
      class="tg-body-hyperlink-mobile text-on-background-image text-opacity-medium pb-4"
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
