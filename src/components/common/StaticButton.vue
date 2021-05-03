<template>
  <component :is="type" :href="href" :to="to">
    <slot />
  </component>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "StaticButton",
  props: {
    href: {
      type: String,
      default: null
    },
    to: {
      type: String,
      default: null
    }
  },
  computed: {
    type() {
      if (this.href) {
        return "a";
      } else if (this.to) {
        return "router-link";
      } else {
        return "button";
      }
    }
  }
});
</script>
