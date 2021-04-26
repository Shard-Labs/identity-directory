<template>
  <div class="flex flex-col justify-center">
    <div class="flex justify-between items-center" @click="toggleDropdown">
      <span>{{ selectedValue }}</span>
      <ul
        class="absolute bg-gray flex flex-col rounded-md mt-2 z-10"
        v-show="isOpen"
      >
        <li
          v-for="(chain, index) in data"
          :key="index"
          @click="select(chain, index)"
        >
          <a href="#">{{ chain.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "FinalDropdown",
  props: {
    data: {
      type: Array,
      required: false
    },
    value: {
      type: String,
      required: true
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
      if (this.isOpen) {
        this.isOpen = false;
      }
    },
    select(index) {
      this.isOpen = false;
      this.selectedValue = this.data[index].title;
      this.$emit("select", index);
    }
  },
};
</script>
