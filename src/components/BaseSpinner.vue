<template>
  <div class="loading"></div>
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

.loading {
  @apply border-white border-4 rounded-full w-10 h-10;
  animation: spin 500ms linear infinite;
  border-bottom-color: transparent;
  border-right-color: transparent;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
