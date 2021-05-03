<template>
  <div class="relative outline-none" :tabindex="0" @blur="closeDropdown">
    <div
      class="flex justify-around items-center outline-none w-full bg-gray-50 rounded-md px-2 py-2 space-x-2"
      :class="{ textClasses: true, isOpenClass: isOpen }"
      role="button"
      @click="toggleDropdown"
    >
      <Icon v-if="prefixIcon" :name="prefixIcon" />
      <span class="sm:text-xs lg:text-base"> {{ valueText }}</span>
      <Icon name="arrow-down" />
    </div>
    <ul
      class="absolute bg-gray-50 flex flex-col rounded-t-none rounded-b-md z-20 w-full"
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
import { defineComponent } from "vue";
import Icon from "@/components/common/Icon.vue";

export default defineComponent({
  name: "Dropdown",
  components: {
    Icon
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
    isOpenClass: {
      type: String,
      required: false
    },
    prefixIcon: {
      type: String,
      required: false
    }
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
    }
  }
});
</script>
