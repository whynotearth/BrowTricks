<template>
  <div
    class="h-14 flex items-center p-5 fixed top-0 z-10 text-on-background-image-high"
  >
    <MenuIcon class="fill-current w-6 h-6" />
    <div v-if="tenantName" class="tg-h2-mobile pl-4">
      {{ tenantName }}
    </div>
  </div>
</template>

<script>
import MenuIcon from '@/assets/icons/menu.svg';

export default {
  name: 'MenuHeader',
  components: {
    MenuIcon
  },
  props: {
    tenantName: String
  }
};
</script>

<style scoped />
