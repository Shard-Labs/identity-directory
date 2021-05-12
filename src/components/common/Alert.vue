<template>
  <div class="fixed w-full top-0 left-0 flex justify-center z-50">
    <transition name="alert">
      <div
        v-if="notification.show"
        class="flex items-center justify-between rounded-lg shadow-md px-6 mx-auto mt-2 h-12 bg-opacity-70"
        @click="hideAlert"
        :class="{
          'bg-green': notification.type === 'success',
          'bg-red-500': notification.type === 'error',
          'bg-yellow-400': notification.type === 'warning'
        }"
      >
        <strong class="font-medium text-white text-base">{{
          notification.message
        }}</strong>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { mapGetters } from "vuex";
import { ActionTypes } from "@/store/actions";
import { mapActions } from "vuex";

export default defineComponent({
  name: "AlertContainer",
  data() {
    return {
      timeout: null
    };
  },
  computed: {
    ...mapGetters(["notification"])
  },
  methods: {
    ...mapActions({ setNotification: ActionTypes.SetNotification }),
    hideAlert() {
      clearTimeout(this.timeout);
      this.setNotification({
        type: "",
        show: false,
        message: ""
      });
    }
  },
  watch: {
    notification(newVal) {
      if (newVal.show) {
        this.timeout = setTimeout(this.hideAlert, 2500);
      }
    }
  }
});
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
.alert-leave-active {
  transition: all 0.3s ease;
}
</style>
