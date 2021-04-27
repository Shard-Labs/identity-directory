<template>
  <card class="pt-11 pb-10 w-1/3 flex flex-col items-center">
    <Avatar />
    <div class="mb-6">
      <h2 class="font-extrabold text-2xl">
        {{ name }}
      </h2>
      <p class="text-xs">
        {{ email }}
      </p>
    </div>
    <div class="flex justify-between align-center">
      <a
        target="_blank"
        :href="socials.websiteUrl"
        class="p-3 text-white rounded-full cursor-pointer bg-pink w-16 flex items-center justify-center mr-8"
      >
        <Icon name="web" />
      </a>
      <a
        target="_blank"
        :href="socials.elementUrl"
        class="p-3 text-white rounded-full cursor-pointer bg-green w-16 flex items-center justify-center mr-8"
      >
        <Icon name="element" />
      </a>
      <a
        target="_blank"
        :href="socials.twitterUrl"
        class="p-3 text-white rounded-full cursor-pointer bg-blue w-16 flex items-center justify-center mr-8"
      >
        <Icon name="twitter" />
      </a>
    </div>
  </card>
</template>

<script>
import Avatar from "../common/Avatar";
import Card from "../common/Card.vue";
import Icon from "@/components/common/Icon.vue";
export default {
  components: {
    Avatar,
    Card,
    Icon
  },
  props: {
    name: { type: String },
    email: { type: String },
    socials: { type: Object }
  }
};
</script>
