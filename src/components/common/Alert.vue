<template>
  <transition name="fade">
    <div
      class="bg-gray-transparent fixed left-0 top-0 z-40"
      v-if="isVisible"
      @click="close"
    >
      <div class="bg-gray rounded-md shadow-md fixed top-0 px-2 py-2 flex justify-start items-center">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Alert",

  data: () => ({
    isVisible: false
  }),
  methods: {
    open() {
      this.isVisible = true;
    },
    close() {
      this.isVisible = false;
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
