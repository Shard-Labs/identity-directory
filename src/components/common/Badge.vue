<template>
  <div
    :class="bgColor"
    class="w-20 h-6 text-xs text-white font-bold rounded-full flex items-center justify-center"
  >
    <Icon v-if="prefixIcon" :name="prefixIcon" iconClass="mr-1" />
    <p>{{ label }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "@/components/common/Icon.vue";

export default defineComponent({
  name: "Badge",
  props: {
    color: {
      type: String,
      required: true
    },
    prefixIcon: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    }
  },
  components: {
    Icon
  },
  computed: {
    bgColor(): string {
      return `bg-${this.color}`;
    }
  }
});
</script>
