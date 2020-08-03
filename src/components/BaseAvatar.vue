<template functional>
  <img
    class="rounded-full"
    :class="[props.width || 'w-16', props.height || 'h-16']"
    :src="
      props.avatarUrl ||
        'https://res.cloudinary.com/whynotearth/image/upload/v1595228411/BrowTricks/avatar-placeholder_dphhvx.png'
    "
    alt="user-logo"
  />
</template>

<script>
export default {
  name: 'BaseAvatar'
};
</script>
