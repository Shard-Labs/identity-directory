<template>
  <card class="bg-white" v-show="isOpen">
    <header class="flex justify-around items-center px-4 py-4">
      <div class="flex justify-between space-x-4">
        <slot name="header"></slot>
      </div>
      <button class="bg-transparent px-1 py-1" @click="closeCard">
        <Icon :name="close" />
      </button>
    </header>
    <body class="px-4 py-4">
      <slot name="body"></slot>
    </body>
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
