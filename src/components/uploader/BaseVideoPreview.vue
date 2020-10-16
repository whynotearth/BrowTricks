<template functional>
  <a
    class="block bg-black bg-opacity-disabled relative w-full h-full"
    @click.prevent="props.selectFile(props.file)"
  >
    <div class="aspect-ratio-box">
      <div class="aspect-ratio-box-inside">
        <img
          v-if="props.file"
          class="upload-img--dimension object-cover object-center w-full h-full cursor-pointer"
          :src="props.file.thumbnail"
        />
      </div>
    </div>
  </a>
</template>
