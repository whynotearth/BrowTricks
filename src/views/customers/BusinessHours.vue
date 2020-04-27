<template>
  <div id="customer-home" class="min-h-screen flex flex-col">
    <MenuHeader :tenantName="tenantName" />
    <div
      class="p-6 pb-20 flex-grow flex flex-col items-center justify-center text-on-background-image-high"
    >
      <div class="tg-h1-mobile mb-5">Business Hours</div>
      <div class="tg-body-mobile">
        <div class="grid grid-cols-2 col-gap-12 row-gap-4">
          <div class="text-left">Monday</div>
          <div>9:00AM - 5:00PM</div>
          <div class="text-left">Tuesday</div>
          <div>9:00AM - 5:00PM</div>
          <div class="text-left">Wednesday</div>
          <div>9:00AM - 5:00PM</div>
          <div class="text-left">Thursday</div>
          <div>9:00AM - 5:00PM</div>
          <div class="text-left">Friday</div>
          <div>9:00AM - 5:00PM</div>
          <div class="text-left">Saturday</div>
          <div>9:00AM - 5:00PM</div>
          <div class="text-left">Sunday</div>
          <div>Closed</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuHeader from '@/components/MenuHeader.vue';

export default {
  name: 'CustomerHome',
  components: {
    MenuHeader
  },
  props: {
    tenantName: {
      type: String,
      default: 'Carissa Queen'
    }
  }
};
</script>

<style scoped>
/* temporary scoped css to simulate background until actual background is provided by product */

#customer-home:before {
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
