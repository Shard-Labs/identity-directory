<template>
  <img class="rounded-full object-cover" :src="imgSrc" :alt="alt" />
</template>

<script>
export default {
  name: "Avatar",
  props: {
    src: {
      type: String
    },
    alt: {
      type: String,
      required: true
    }
  },
  methods: {
    shuffleColor() {
      const colors = ["pink", "blue", "green"];
      this.background = colors.pop(Math.floor(Math.random() * colors.length));
    }
  },
  computed: {
    imgSrc() {
      return this.src ? this.src : this.shuffleColor();
    }
  }
};
</script>
