<template functional>
  <div class="bg-black bg-opacity-disabled relative w-full h-full">
    <img
      v-if="props.image"
      @click="props.selectImage([props.image, props.index])"
      class="upload-img--dimension object-cover object-center w-full h-full cursor-pointer"
      :src="props.image"
    />
  </div>
</template>
