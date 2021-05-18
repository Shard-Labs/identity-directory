<template>
  <div>
    <div class="flex mb-6 px-8 pt-12 rounded-lg">
      <Avatar :name="identity && identity.legal" innerClass="md:w-24 md:h-24" />
      <div class="text-left flex flex-col justify-center ml-5">
        <h2 class="font-extrabold text-2xl">
          {{ name }}
        </h2>
        <p class="text-xs">
          {{ identity && identity.email }}
        </p>
      </div>
    </div>
    <div class="flex align-center items-center px-8">
      <button
        @click="sendToken"
        class="mr-4 max-h-10 font-medium bg-pink text-white border-solid border-pink rounded-full py-2 px-4 shadow-pink flex justify-between space-x-2"
      >
        Send Tokens
      </button>
      <a
        target="_blank"
        :href="web"
        class="mr-4 p-3 h-10 text-white rounded-full cursor-pointer w-10 flex items-center justify-center block bg-green"
        :class="{ 'bg-gray-600': !web }"
        :disabled="!web"
      >
        <Icon name="web" />
      </a>
      <a
        target="_blank"
        :href="riot"
        class="mr-4 p-3 h-10 text-white rounded-full cursor-pointer w-10 flex items-center justify-center block bg-green"
        :class="{ 'bg-gray-600': !riot }"
        :disabled="!riot"
      >
        <Icon name="element" />
      </a>
      <a
        target="_blank"
        :href="twitter"
        class="mr-4 p-3 h-10 text-white rounded-full cursor-pointer w-10 flex items-center justify-center block bg-green"
        :class="{ 'bg-gray-600': !twitter }"
        :disabled="!twitter"
      >
        <Icon name="twitter" />
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Avatar from "../common/Avatar.vue";
import Icon from "../common/Icon.vue";
export default {
  name: "Idntity",
  components: { Avatar, Icon },
  computed: {
    ...mapGetters(["identity"]),
    name() {
      if (this.identity) {
        return this.identity.legal || this.identity.display;
      }
      return "No Info";
    }
  },
  methods: {
    sendToken(){
      this.$emit("sendToken");
    }
  }
};
</script>

<style></style>
