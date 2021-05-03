<template>
  <div class="p-0 m-0 shadow-gray flex flex-col justify-around items-center">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Card"
});
</script>
