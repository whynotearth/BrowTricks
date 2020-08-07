<template functional>
  <a
    class="bg-black bg-opacity-disabled relative w-full h-full"
    @click.prevent="props.selectImage([props.image, props.index])"
  >
    <img
      v-if="props.image"
      class="upload-img--dimension object-cover object-center w-full h-full cursor-pointer"
      :src="props.image"
    />
  </a>
</template>
