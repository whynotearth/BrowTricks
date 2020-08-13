<template functional>
  <a
    class="bg-black bg-opacity-disabled relative w-full h-full"
    @click.prevent="props.selectFile(props.file)"
  >
    <img
      class="upload-img--dimension object-cover object-center w-full h-full cursor-pointer"
      :src="props.file.url"
    />
  </a>
</template>
