<template>
  <div class="backdrop" v-if="show" @click="handleClose">
    <div class="modal" @click="handleModalClick">
      <div
        class="flex justify-between p-5 text-black font-bold text-xl items-center"
      >
        {{ header }}
        <button @click="handleClose">
          <Icon name="close" />
        </button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/common/Icon.vue";

export default {
  name: "Modal",
  components: { Icon },
  props: {
    show: {
      type: Boolean
    },
    header: {
      type: String
    }
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    handleModalClick(event) {
      event.stopPropagation();
    }
  }
};
</script>

<style>
.backdrop {
  background-color: rgba(50, 50, 50, 0.5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.modal {
  position: absolute;
  min-width: 400px;
  top: 75px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 2px solid #e6007a;
  border-radius: 25px;
  color: #e6007a;
  z-index: 100;
}
</style>
