<template>
  <div>
    <li
      v-for="item in items"
      v-bind:key="item.name"
      class="flex justify-between align-center px-4 py-4 h-12 md:h-16 md:py-8"
    >
      <avatar class="w-10 md:w-14" />
      <span> {{ item.name }} </span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g data-name="Layer 2">
          <path
            d="M10 19a1 1 0 01-.64-.23 1 1 0 01-.13-1.41L13.71 12 9.39 6.63a1 1 0 01.15-1.41 1 1 0 011.46.15l4.83 6a1 1 0 010 1.27l-5 6A1 1 0 0110 19z"
            data-name="arrow-ios-forward"
          />
        </g>
      </svg>
    </li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Avatar from "../common/Avatar.vue";

export default defineComponent({
  name: "ListItem",
  components: {
    Avatar
  },
  props: {
    name: { type: String }
  }
});
</script>
