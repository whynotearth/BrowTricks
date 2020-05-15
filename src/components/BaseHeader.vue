<template>
  <div class="h-14 w-full p-5 sticky top-0 z-10 flex items-center">
    <div @click="$emit('iconClicked')">
      <slot name="icon" />
    </div>
    <div class="tg-h2-mobile">
      <slot name="content" />
    </div>
    <div class="flex-end flex items-center tg-caption-mobile">
      <div @click="$emit('detailPrimaryClicked')">
        <slot name="detail-primary" />
      </div>
      <div @click="$emit('detailSecondaryClicked')">
        <slot name="detail-secondary" />
      </div>
    </div>

    <slot name="menu-drawer" />
  </div>
</template>

<script>
export default {
  name: 'BaseHeader'
};
</script>
