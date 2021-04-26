<template>
  <div class="flex flex-col justify-center">
    <div class="flex justify-between space-x-4 mb-4">
      <div
        class="absolute z-30 left-0 mt-2 resultDropdown"
        v-if="selectedValue"
        @click="isOpen = !isOpen"
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
        <div>
          <span class="px-4"> {{ selectedValue }} </span>

          <div
            v-if="isOpen"
            class="absolute z-30 left-0 mt-2"
            :class="{ hidden: !isOpen }"
          >
            <ul class="absolute bg-gray flex flex-col rounded-md mt-2 z-10">
              <li
                class="block text-purple-600 font-semibold px-4 py-2 | hover:text-white hover:bg-purple-500"
                v-for="(chain, index) in data"
                :key="index"
                @click="closeDropDownAndEmmitData(index)"
              >
                <a href="#">{{ chain.title }}</a>
              </li>
            </ul>
          </div>
        </div>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
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
    closeDropDownAndEmmitData(index) {
      this.isOpen = false;
      this.selectedValue = this.data[index].title;
      this.$emit("select", index);
    }
  }
};
</script>
<style>
.absolute {
  display: contents;
}
.resultDropdown {
  cursor: pointer;
}
</style>
