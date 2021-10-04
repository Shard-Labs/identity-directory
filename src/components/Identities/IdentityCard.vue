<template>
  <card
    class="pt-11 pb-10 flex flex-col items-center mt-6 cursor-pointer"
    @click="goToIdentity"
  >
    <Avatar
      :name="identity.legal"
      innerClass="md:w-24 md:h-24"
      :email="identity && identity.email"
    />
    <div class="mb-6">
      <h2 class="font-extrabold text-2xl">
        {{
          identity.legal ||
          identity.display ||
          identity.address.slice(0, 8) + "..."
        }}
      </h2>
      <p class="text-xs">
        {{ identity.email }}
      </p>
    </div>
    <div class="flex justify-center align-center w-full">
      <a
        v-if="web"
        @click="(e) => e.stopPropagation()"
        target="_blank"
        :href="web"
        class="
          p-3
          text-white
          rounded-full
          cursor-pointer
          w-16
          h-16
          flex
          items-center
          justify-center
          block
          bg-pink
          mr-5
        "
        :class="{ 'bg-gray-600': !web }"
        :disabled="!web"
      >
        <Icon name="web" />
      </a>
      <a
        v-if="riot"
        @click="(e) => e.stopPropagation()"
        target="_blank"
        :href="riot"
        class="
          p-3
          text-white
          rounded-full
          cursor-pointer
          w-16
          h-16
          flex
          items-center
          justify-center
          block
          bg-green
          mr-5
        "
        :class="{ 'bg-gray-600': !riot }"
        :disabled="!riot"
      >
        <Icon name="element" />
      </a>
      <a
        v-if="twiter"
        @click="(e) => e.stopPropagation()"
        target="_blank"
        :href="twitter"
        class="
          p-3
          text-white
          rounded-full
          cursor-pointer
          w-16
          h-16
          flex
          items-center
          justify-center
          block
          relative
          bg-blue
          mr-5
        "
        :class="{ 'bg-gray-600': !twitter }"
        :disabled="!twitter"
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
    identity: {
      type: Object,
      required: true
    }
  },
  computed: {
    web() {
      return this.identity.web;
    },
    twitter() {
      const { twitter } = this.identity;
      if (twitter) {
        return `https://twitter.com/${twitter}`;
      }
      return null;
    },
    riot() {
      const { riot } = this.identity;
      if (riot) {
        return `https://matrix.to/#/${riot}`;
      }
      return null;
    }
  },
  methods: {
    goToIdentity() {
      const { address } = this.identity;
      const { network } = this.$route.params;
      this.$router.push({ name: "Identity", params: { address, network } });
    }
  }
};
</script>
