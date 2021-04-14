<template>
  <div class="relative">
    <div
      class="flex justify between items-center outline-none"
      :class="textClasses"
      role="button"
      @click="toggleDropdown"
    >
      <v-clamp class="w-full" v-if="showText" autoresize :max-lines="1">
        {{ valueText }}
      </v-clamp>
      <slot></slot>
    </div>
    <ul
      class="absolute bg-gray flex flex-col rounded-md mt-2 z-10"
      :class="dropdownClasses"
      v-show="isOpen"
    >
      <li
        tabindex="-1"
        v-for="(item, index) in data"
        :key="item"
        @click="select(item, index)"
        class="outline-none"
        :class="[isSelected(item) ? selectedTabClasses : dropdownTabClasses]"
      >
        <button type="button" class="w-full text-left font-semibold py-4 px-6">
          <span>{{ text[index] }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TestDropdown",
  props: {
    data: {
      type: Array,
      required: false
    },
    value: {
      type: String,
      required: true,
    },
    valueText: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false
    },
    textClasses: {
      type: String
    },
    dropdownClasses: {
      type: String
    },
    dropdownTabClasses:{
      type: String,
    },
    selectedTabClasses: {
      type: String
    },
    showText: {
      type: Boolean,
      default: true,
    },
  },
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
    isSelected(value) {
      return this.value === value;
    },
    select(value, index) {
      this.closeDropdown();
      this.$emit("select", { value, index });
    }
  }
};
</script>
