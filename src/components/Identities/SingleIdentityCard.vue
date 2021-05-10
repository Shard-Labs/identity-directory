<template>
  <card class="pt-11 pb-10 flex flex-col items-center bg-transparent">
    <Avatar
      :name="identity.attributes.identity_legal"
      innerClass="md:w-24 md:h-24"
    />
    <div class="mb-6">
      <h2 class="font-extrabold text-2xl">
        {{ identity.attributes.identity_legal || "No Name" }}
      </h2>
      <p class="text-xs">
        {{ identity.attributes.identity_email }}
      </p>
    </div>
    <div class="flex justify-around align-center w-full">
      <button
          @click="connect"
          class="bg-pink text-white border-solid border-pink rounded-full py-2 px-4"
        >
          <span class="font-medium">Connect</span>
        </button>
      <a
        target="_blank"
        :href="web"
        class="p-3 text-white rounded-full cursor-pointer w-16 flex items-center justify-center block bg-pink"
        :class="{ 'bg-gray-600': !web }"
        :disabled="!web"
      >
        <Icon name="web" />
      </a>
      <a
        target="_blank"
        :href="riot"
        class="p-3 text-white rounded-full cursor-pointer w-16 flex items-center justify-center block bg-green"
        :class="{ 'bg-gray-600': !riot }"
        :disabled="!riot"
      >
        <Icon name="element" />
      </a>
      <a
        target="_blank"
        :href="twitter"
        class="p-3 text-white rounded-full cursor-pointer w-16 flex items-center justify-center block relative bg-blue"
        :class="{ 'bg-gray-600': !twitter }"
        :disabled="!twitter"
      >
        <Icon name="twitter" />
      </a>
    </div>
  </card>
</template>

<script>
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
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
      return this.identity.attributes.identity_web;
    },
    twitter() {
      const { identity_twitter: twitter } = this.identity.attributes;
      if (twitter) {
        return `https://twitter.com/${twitter}`;
      }
      return null;
    },
    riot() {
      const { identity_riot: riot } = this.identity.attributes;
      if (riot) {
        return `https://matrix.to/#/${riot}`;
      }
      return null;
    }
  },
  methods: {
    connect(){
      const extensions = await web3Enable("identity-directory");
      if (extensions.length === 0) {
        // alert "missing polkadot extension, please install plus link"
        return;
      }
      const allAccounts = await web3Accounts();
    }, 
  },
};
</script>