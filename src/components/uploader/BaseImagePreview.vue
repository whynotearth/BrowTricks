<template functional>
  <a
    class="bg-black bg-opacity-disabled relative w-full h-full"
    @click.prevent="props.selectFile(props.file)"
  >
    <div class="aspect-ratio-box">
      <div class="aspect-ratio-box-inside">
        <img
          class="upload-img--dimension object-cover object-center w-full h-full cursor-pointer"
          :src="props.thumbnail || props.file.url"
        />
      </div>
    </div>
  </a>
</template>
