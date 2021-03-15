<template>
  <img class="rounded-full object-cover" :src="imgSrc" :alt="alt" />
</template>

<script>
export default {
  name: "Avatar",
  props: {
    src: {
      type: String,
    },
    alt: {
      type: String,
      required: true,
    },
  },
};
</script>
