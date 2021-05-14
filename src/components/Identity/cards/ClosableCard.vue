<template>
  <card class="bg-white" v-show="isOpen">
    <div class="h-full">
      <header class="flex justify-between items-center px-4 py-4 w-full">
        <div class="flex justify-between space-x-4  items-center">
          <slot name="header" class="text-left"></slot>
        </div>
        <button class="bg-transparent h-full" @click="closeCard">
          <Icon name="close" />
        </button>
      </header>
      <body class="px-4 py-4">
        <slot name="body"></slot>
      </body>
    </div>
  </card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "../../common/Card.vue";
import Icon from "../../common/Icon.vue";

export default defineComponent({
  name: "ClosableCard",
  components: {
    Card,
    Icon
  },
  data() {
    return {
      isOpen: true
    };
  },
  methods: {
    closeCard() {
      this.isOpen = false;
    }
  }
});
</script>
