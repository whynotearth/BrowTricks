<template>
  <div class="flex justify-center flex-col items-center">
    <img
      class="h-24 m-auto block mb-10"
      src="https://res.cloudinary.com/whynotearth/image/upload/v1597646048/BrowTricks/static_v2/crown_zp6ziq.png"
      alt=""
    />
    <BaseSpinner />
  </div>
</template>

<script>
import BaseSpinner from '@/components/BaseSpinner';

export default {
  name: 'Loading',
  components: { BaseSpinner }
};
</script>

<style scoped></style>
