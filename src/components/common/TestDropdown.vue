<template>
  <div class="relative outline-none mb-2" :tabindex="0" @blur="closeDropdown">
    <div
      class="flex justify-around items-center outline-none w-full bg-gray rounded-md px-2 py-2 space-x-2"
      :class="{ textClasses: true, isOpenClass: isOpen }"
      role="button"
      @click="toggleDropdown"
    >
      <svg
        width="24"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.29 9.29l-4 4a1 1 0 000 1.42.998.998 0 001.42 0l4-4a1.004 1.004 0 10-1.42-1.42z"
          fill="#C6C6CD"
        />
        <path
          d="M12.28 17.4L11 18.67a4.2 4.2 0 01-5.58.4 4 4 0 01-.27-5.93l1.42-1.43a.999.999 0 000-1.42 1 1 0 00-1.42 0l-1.27 1.28a6.15 6.15 0 00-.67 8.07 6.06 6.06 0 009.07.6l1.42-1.42a1.004 1.004 0 10-1.42-1.42zM19.66 3.22a6.18 6.18 0 00-8.13.68L10.45 5a1.09 1.09 0 00-.17 1.61 1 1 0 001.42 0L13 5.3a4.17 4.17 0 015.57-.4 4 4 0 01.27 5.95l-1.42 1.43a1 1 0 000 1.42.998.998 0 001.42 0l1.42-1.42a6.06 6.06 0 00-.6-9.06z"
          fill="#C6C6CD"
        />
      </svg>
      <span class="sm:text-xs lg:text-base"> {{ valueText }}</span>
      <svg
        width="24"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 15.5a.999.999 0 01-.71-.29l-4-4a1.004 1.004 0 111.42-1.42L12 13.1l3.3-3.18a1 1 0 111.38 1.44l-4 3.86a1 1 0 01-.68.28z"
          fill="#C6C6CD"
        />
      </svg>
    </div>
    <ul
      class="absolute bg-gray flex flex-col rounded-t-none rounded-b-md z-20 w-full"
      :class="dropdownClasses"
      v-show="isOpen"
    >
      <li
        tabindex="-1"
        v-for="(item, index) in data"
        :key="item"
        class="outline-none"

      >
        <button
          type="button"
          class="w-full text-left py-4 px-6 hover:text-pink"
          @mousedown="event => select(index, event)"
        >
          {{ item.title }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
  name: "TestDropdown",
  components: {
    
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    data: {
      type: Array,
      required: false
    },
    value: {
      type: String,
      required: true
    },
    valueText: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: false
    },
    isOpenClass: {
      type: String,
      required: false
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
      if (this.data && this.data.length > 0) {
        this.isOpen = !this.isOpen;
      }
    },
    closeDropdown() {
      this.isOpen = false;
    },
    isSelected(value) {
      return this.value === value;
    },
    select(index, event) {
      event.stopPropagation();
      this.closeDropdown();
      this.$emit("select", index);
    },
    onClickOutside(event) {
      console.log("Clicked outside. Event: ", event);
    }
  }
};
</script>
<style>

</style>
