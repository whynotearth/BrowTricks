<template>
  <div
    class="h-14 w-full p-5 sticky top-0 z-10 flex items-center text-on-background-image"
  >
    <a @click.prevent="toggleMenuDrawer"
      ><MenuIcon class="fill-current w-6 h-6"
    /></a>
    <div v-if="tenantName" class="tg-h2-mobile pl-5">
      {{ tenantName }}
    </div>
    <BaseMenuDrawer />
  </div>
</template>

<script>
import MenuIcon from '@/assets/icons/menu.svg';
import BaseMenuDrawer from '@/components/BaseMenuDrawer.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'MenuHeader',
  components: {
    MenuIcon,
    BaseMenuDrawer
  },
  props: {
    tenantName: String
  },
  methods: {
    ...mapMutations(['toggleMenuDrawer'])
  }
};
</script>

<style scoped />
