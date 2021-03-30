<template>
  <li v-for="(item, index) in data" :key="item" @click="select(item, index)">
    <button type="button">
     <span> {{ item.label }} </span>
    </button>
  </li>
</template>

<script>


export default {
  name: "DropdownItem",
  
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
