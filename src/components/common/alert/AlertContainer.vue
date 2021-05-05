<template>
  <div class="fixed w-full top-0 left-0 flex justify-center z-50">
    <transition name="alert">
      <Alert v-if="showAlert" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Alert from "./Alert";
export default {
  name: "AlertContainer",
  components: {
    Alert
  },
  computed: {
    ...mapGetters ({ alerts })
  },
};
</script>

<style>
.alert-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
.alert-enter-active {
  transition: all 0.3s ease;
}
.alert-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.alert-enter-active {
  transition: all 0.3s ease;
}
</style>
