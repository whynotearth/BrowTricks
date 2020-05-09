<template>
  <div id="customer-business-hours" class="min-h-screen flex flex-col">
    <BaseMenuHeader :tenantName="tenantName" />
    <div
      class="p-6 flex-grow flex flex-col items-center justify-center text-on-background-image"
    >
      <div class="tg-h1-mobile mb-5">Business Hours</div>
      <div class="tg-body-mobile">
        <div class="flex flex-col w-64">
          <div class="flex justify-between w-full pb-4">
            <div>Monday</div>
            <div>9:00AM - 5:00PM</div>
          </div>
          <div class="flex justify-between w-full pb-4">
            <div>Tuesday</div>
            <div>9:00AM - 5:00PM</div>
          </div>
          <div class="flex justify-between w-full pb-4">
            <div>Wednesday</div>
            <div>9:00AM - 5:00PM</div>
          </div>
          <div class="flex justify-between w-full pb-4">
            <div>Thursday</div>
            <div>9:00AM - 5:00PM</div>
          </div>
          <div class="flex justify-between w-full pb-4">
            <div>Friday</div>
            <div>9:00AM - 5:00PM</div>
          </div>
          <div class="flex justify-between w-full pb-4">
            <div>Saturday</div>
            <div>9:00AM - 5:00PM</div>
          </div>
          <div class="flex justify-between w-full">
            <div>Sunday</div>
            <div>Closed</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseMenuHeader from '@/components/BaseMenuHeader.vue';

export default {
  name: 'CustomerBusinessHours',
  components: {
    BaseMenuHeader
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

#customer-business-hours:before {
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
