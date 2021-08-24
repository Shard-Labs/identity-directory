<template>
  <card class="bg-white" :class="{ 'h-16': !isOpen }">
    <div class="w-full h-full">
      <header class="flex justify-between items-center px-4 py-4 w-full">
        <div class="flex justify-between space-x-4 items-center">
          <slot name="header" class="text-left"></slot>
        </div>
        <button
          class="bg-transparent h-full w-8 outline-none"
          @click="closeCard"
        >
          <Icon :name="isOpen ? 'close' : 'arrow-right'" />
        </button>
      </header>
      <body class="px-4 py-4" v-show="isOpen">
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
  props: {
    closed: {
      type: String
    }
  },
  data() {
    return {
      isOpen: true
    };
  },
  methods: {
    closeCard() {
      this.isOpen = !this.isOpen;
    }
  },
  created() {
    if (this.closed) {
      this.isOpen = false;
    }
  },
});
</script>
