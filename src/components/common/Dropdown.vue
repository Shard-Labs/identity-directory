<template>
  <div class="relative">
    <div
      class="flex justify between items-center outline-none"
      role="button"
      @click="toggleDropdown"
    >
      <div v-if="active"><slot /></div>
      <slot></slot>
    </div>
    <div class="absolute bg-gray flex justify-around rounded-full py-3 px-6">
      <ul class="flex flex-col" v-show="isOpen">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  data() {
    return {
      isOpen: false,
      selectedValue: this.value
    };
  },
  methods: {
    toggleDropdown() {
      if (this.item && this.item.length > 0) {
        this.isOpen = !this.isOpen;
      }
    },
    closeDropdown() {
      this.isOpen = false;
    },
  }
};
</script>
