<template>
  <div class="flex flex-col justify-center">
    <nav-link :exact="true" path="/" class="mb-8">
      <Icon name="identities" iconClass="mr-4" />
      <div class="text-base font-bold">
        Identity Directory
      </div>
    </nav-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavLink from "./NavLink.vue";
import Icon from "@/components/common/Icon.vue";

export default defineComponent({
  name: "NavBar",
  components: {
    NavLink,
    Icon
  }
});
</script>
