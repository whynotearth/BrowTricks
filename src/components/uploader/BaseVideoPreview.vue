<template functional>
  <a
    class="block bg-black bg-opacity-disabled relative w-full h-full"
    :href="props.file"
    target="_blank"
  >
    <img
      v-if="props.file"
      class="upload-img--dimension object-cover object-center w-full h-full cursor-pointer"
      :src="props.image"
    />
  </a>
</template>
