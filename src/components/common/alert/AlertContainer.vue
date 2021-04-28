<template>
  <div class="fixed w-full top-0 left-0 flex justify-center z-50">
    <transition name="alert">
      <Alert v-if="showAlert" />
    </transition>
  </div>
</template>

<script>
import { ref } from "vue";
import Alert from "./Alert";
export default {
  name: "AlertContainer",
  components: {
    Alert
  },
  setup() {
    showAlert = ref(false);

    const triggerAlert = () => {
      showAlert.value = true;
      setTimeout(() => (showAlert.value = false), 2000);
    };
    return { showAlert, triggerAlert };
  }
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
