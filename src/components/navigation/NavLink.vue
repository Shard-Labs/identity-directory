<template>
  <router-link :to="path" v-slot="{ navigate, isActive, isExactActive }">
    <div
      class="flex cursor-pointer outline-none p-1 space x-4 items-center"
      :class="exact ? isExactActive : isActive"
      @click="navigate"
    >
      <slot></slot>
    </div>
  </router-link>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavLink",
  props: {
    path: { type: String },
    exact: { type: String }
  }
});
</script>

<style scoped>
.router-link-active {
  background-color: "#e6007a";
}
</style>
