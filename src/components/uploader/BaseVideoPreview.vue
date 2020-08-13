<template functional>
  <a
    class="block bg-black bg-opacity-disabled relative w-full h-full"
    @click.prevent="props.selectFile(props.file)"
  >
    <img
      v-if="props.file"
      class="upload-img--dimension object-cover object-center w-full h-full cursor-pointer"
      :src="props.file.thumbnail"
    />
  </a>
</template>
