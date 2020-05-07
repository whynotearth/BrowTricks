<template>
  <div id="test-component" class="min-h-screen flex flex-col">
    <MenuHeader />
    <div
      class="p-6 pb-20 flex-grow flex flex-col items-center justify-center text-on-background"
    >
      <LineItem class="mb-2">
        <template #image>
          <img src="https://dummyimage.com/40x40/000/fff" class="h-10 w-10" />
        </template>
        <template #title>
          Paul Chris Luke
        </template>
        <template #subtitle>
          <p class="tg-body-mobile text-on-background text-opacity-medium">
            Microblading
          </p>
        </template>
        <template #description>
          <p class="tg-body-mobile text-on-background text-opacity-medium">
            Feb 12, 2020 - 5:00PM
          </p>
        </template>
        <template #detail class="tg-body-caption text-opacity-medium">
          <p class="tg-caption-mobile text-on-background text-opacity-medium">
            $100
          </p>
        </template>
      </LineItem>
      <LineItem @detailClicked="detailClicked" class="mb-2">
        <template #image>
          <img src="https://dummyimage.com/40x40/000/fff" class="h-10 w-10" />
        </template>
        <template #title>
          Paul Chris Luke
        </template>
        <template #subtitle>
          <p class="tg-body-mobile text-on-background text-opacity-medium">
            Hair Coloring
          </p>
        </template>
        <template #description>
          <p class="tg-body-mobile text-on-background text-opacity-medium">
            Wed, Feb 12, 2020 - 5:00PM
          </p>
        </template>
        <template #detail>
          <DeleteIcon class="text-action fill-current cursor-pointer" />
        </template>
      </LineItem>
      <LineItem>
        <template #image>
          <img src="https://dummyimage.com/40x40/000/fff" class="h-10 w-10" />
        </template>
        <template #title>
          Manicure
        </template>
        <template #subtitle>
          <p class="tg-body-mobile text-on-background text-opacity-medium">
            $100
          </p>
        </template>
      </LineItem>
    </div>
  </div>
</template>

<script>
import MenuHeader from '@/components/MenuHeader.vue';
import LineItem from '@/components/ui/LineItem.vue';
import DeleteIcon from '@/assets/icons/delete.svg';
import { mapGetters } from 'vuex';

export default {
  name: 'TestLineItemComponent',
  components: {
    LineItem,
    MenuHeader,
    DeleteIcon
  },
  computed: {
    ...mapGetters(['isMenuDrawerOpen'])
  },
  methods: {
    detailClicked() {
      alert('test');
    }
  }
};
</script>

<style scoped>
/* temporary scoped css to simulate background until actual background is provided by product */

#test-component:before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.75;
  background-image: url('https://i.pinimg.com/originals/80/29/6b/80296b1e27351233d5d82104b3e02a92.jpg');
  background-repeat: no-repeat;
  background-position: 50% 0;
  -ms-background-size: cover;
  -o-background-size: cover;
  -moz-background-size: cover;
  -webkit-background-size: cover;
  background-size: cover;
}
</style>
