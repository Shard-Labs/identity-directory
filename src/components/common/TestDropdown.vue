<template>
  <div class="relative w-2/3 outline-none" :tabindex="0" @blur="closeDropdown">
    <div
      class="flex justify-around items-center outline-none w-full dropdown"
      :class="{ textClasses: true, isOpenClass: isOpen }"
      role="button"
      @click="toggleDropdown"
    >
      <Icon name="chain" class="chain-icon" />
      <span> {{ valueText }}</span>
      <Icon name="arrow-down" class="chain-icon" />
    </div>
    <ul
      class="absolute bg-gray flex flex-col rounded-md z-20 w-full drowdown-list"
      :class="dropdownClasses"
      v-show="isOpen"
    >
      <li
        tabindex="-1"
        v-for="(item, index) in data"
        :key="item"
        class="outline-none"
        :class="[isSelected(item) ? selectedTabClasses : dropdownTabClasses]"
      >
        <button
          type="button"
          class="w-full text-left font-semibold py-4 px-6"
          @mousedown="event => select(index, event)"
        >
          {{ item.title }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from "@/components/common/Icon.vue";
import vClickOutside from "v-click-outside";

export default {
  name: "TestDropdown",
  components: {
    Icon
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
    textClasses: {
      type: String
    },
    dropdownClasses: {
      type: String
    },
    dropdownTabClasses: {
      type: String
    },
    selectedTabClasses: {
      type: String
    },
    showText: {
      type: Boolean,
      default: true
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
    },
    isOpenClass() {
      return {
        "border-bottom-left-radius": 0,
        "border-bottom-right-radius": 0
      };
    },
    onClickOutside(event) {
      console.log("Clicked outside. Event: ", event)
    }
  }
};
</script>
<style>
.dropdown {
  background: #F8FAFC;
  border-radius: 999px;
  height: 48px;

  font-weight: 700;
  font-size: 18px;
  line-height: 22.59px;
}
.chain-icon {
  width: 24px;
  height: 24px;
  color: #c6c6cd;
}
.isOpenClass {
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
