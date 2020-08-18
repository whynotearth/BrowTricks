<template>
  <component :is="type" name="slide-right" tag="div">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    group: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    type() {
      return this.group ? 'transition-group' : 'transition';
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.5s;
}

.fade-enter-active {
  transition-delay: 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.slide-left-leave-active,
.slide-left-enter-active,
.slide-right-leave-active,
.slide-right-enter-active {
  transition: 0.3s;
}

.slide-left-enter {
  transform: translate(100%, 0);
}

.slide-left-leave-to {
  transform: translate(-100%, 0);
}

.slide-right-enter {
  transform: translate(-100%, 0);
}

.slide-right-leave-to {
  transform: translate(100%, 0);
}
</style>
