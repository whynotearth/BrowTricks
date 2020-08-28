<template>
  <div class="bg-primary text-white text-opacity-high py-2 px-6">
    <div v-for="(i, index) in 3" :key="index" class="flex flex-row my-4">
      <div
        class="rounded-full h-10 w-10 flex items-center justify-center bg-background"
      >
        <img
          src="https://res.cloudinary.com/whynotearth/image/upload/v1597646048/BrowTricks/static_v2/crown_zp6ziq.png"
        />
      </div>
      <div class="flex flex-col items-start mx-4">
        <p class="text-on-primary text-base">Hello</p>
        <p class="text-on-primary text-opacity-50 text-xs">World</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropDownSheet'
};
</script>
