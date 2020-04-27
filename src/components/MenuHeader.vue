<template>
  <div class="h-14 flex items-center p-5 fixed top-0 z-10">
    <MenuIcon class="text-on-primary-white fill-current w-6 h-6" />
  </div>
</template>

<script>
import MenuIcon from '@/assets/icons/menu.svg';

export default {
  name: 'MenuHeader',
  components: {
    MenuIcon
  }
};
</script>

<style scoped />
