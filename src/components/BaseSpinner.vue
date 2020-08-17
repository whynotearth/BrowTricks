<template>
  <img
    class="spinner-image w-20 h-20"
    src="https://res.cloudinary.com/whynotearth/image/upload/v1597646048/BrowTricks/static_v2/crown_zp6ziq.png"
    alt=""
  />
</template>

<script>
export default {
  name: 'BaseSpinner'
};
</script>

<style scoped>
.spinner-image {
  animation: spin 1.2s infinite ease-in-out;
}
</style>
