<template>
  <img
    v-if="src"
    class="rounded-full object-cover"
    :class="innerClass"
    :src="src"
    :alt="initials"
  />
  <div
    v-else
    class="rounded-full flex justify-center items-center"
    :class="classCleanUp"
  >
    <h1 v-if="initials" class="text-white font-bold">
      {{ initials }}
    </h1>
    <Icon v-else name="person" iconClass="w-1/2 h-1/2" />
  </div>
</template>

<script>
import Icon from "@/components/common/Icon.vue";

const colors = ["pink", "blue", "green"];
export default {
  name: "Avatar",
  components: {
    Icon
  },
  props: {
    src: {
      type: String
    },
    name: {
      type: [String]
    },
    innerClass: {
      type: [String, Array, Object]
    }
  },
  computed: {
    shuffleColor() {
      return colors[Math.floor(Math.random() * colors.length)];
    },
    classCleanUp() {
      const background = `bg-${this.shuffleColor}`;

      if (typeof this.innerClass === "string") {
        return `${this.innerClass} ${background}`
      }
      if(Array.isArray(this.innerClass)) {
        return [...this.innerClass, background];
      }
      if(typeof this.innerClass === "object") {
        return {
          ...this.innerClass,
          [background]: true,
        };
      }

      return "";
    },
    initials() {
      if (this.name) {
        return this.name
          .split(" ")
          .map(n => n[0])
          .join("");
      }
      return "";
    }
  }
};
</script>
