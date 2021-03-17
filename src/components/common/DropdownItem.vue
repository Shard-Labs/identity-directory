<template>
  <li v-for="(item, index) in data" :key="item" @click="select(item, index)">
    <button type="button">
     <span> {{ item.label }} </span>
    </button>
  </li>
</template>

<script>
import Button from "./Button.vue";

export default {
  name: "DropdownItem",
  components: { Button },
  props: {
    data: {
     type: Array,
     required: false
    }
  },
  methods: {
    select(value, index) {
      this.closeDropdown();
      this.$emit("select", { value, index });
    }
  }
};
</script>
