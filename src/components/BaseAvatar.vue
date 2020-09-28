<template functional>
  <div>
    <img
      class="rounded-full"
      :class="[props.width || 'w-16', props.height || 'h-16']"
      :src="
        props.image ||
          'https://res.cloudinary.com/whynotearth/image/upload/v1595228411/BrowTricks/avatar-placeholder_dphhvx.png'
      "
      alt="User picture"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseAvatar',
  props: ['width', 'height', 'image']
};
</script>
