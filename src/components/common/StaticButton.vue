<template>
  <component :is="type" :href="href" :to="to">
    <slot />
  </component>
</template>

<script>
export default {
  name: "StaticButton",
  props: {
    href: {
      type: String,
      default: null,
    },
  to: {
    type: String,
    default: null,
  },
  },
  computed: {
    type() {
      if(this.href) {
        return "a";
      } else if (this.to) {
        return "router-link"
      } else {
        return "button";
      }
    },
  }
};
</script>