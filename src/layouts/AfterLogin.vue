<template>
  <div class="w-[700px] h-full mx-auto">
    <transition name="fade">
      <div class="w-full h-full">
        <Nuxt />
      </div>
    </transition>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
