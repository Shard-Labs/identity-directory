<template>
  <div class="loading-backdrop" v-if="show">
    <p class="text-black mb-5 font-bold text-lg">LOADING</p>
    <div class="loader flex">
      <div class="ball ball-1 animate-bounce bg-green"></div>
      <div class="ball ball-2 animate-bounce bg-pink"></div>
      <div class="ball ball-3 animate-bounce bg-blue"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    show: Boolean
  }
};
</script>

<style>
.loading-backdrop {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 200px;
  min-width: 400px;
  z-index: 100;
}
.ball {
  z-index: 101;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  margin-right: 10px;
}
.ball-1 {
  animation-delay: -0.3s !important;
}
.ball-2 {
  animation-delay: -0.6s !important;
}
.ball-3 {
  animation-delay: -0.9s !important;
}
</style>
