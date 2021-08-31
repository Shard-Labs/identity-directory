<template>
  <div class="flex flex-col justify-center">
    <nav-link :exact="true" path="/" class="mb-8">
      <Icon name="identities" iconClass="mr-4" />
      <div class="text-base font-bold">Identity Hub</div>
    </nav-link>
    <nav-link :exact="true" :path="path" class="mb-8" v-if="myIdentity">
      <Avatar innerClass="w-12 h-12 mr-4" />
      <div class="text-base font-bold">My Identity</div>
    </nav-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { encodeAddress, decodeAddress } from "@polkadot/keyring";

import NavLink from "./NavLink.vue";
import Icon from "@/components/common/Icon.vue";
import Avatar from "@/components/common/Avatar.vue";

export default defineComponent({
  name: "NavBar",
  components: {
    NavLink,
    Icon,
    Avatar
  },
  computed: {
    ...mapGetters(["myIdentity", "wallet", "network"]),
    path() {
      if (
        this.network &&
        this.wallet &&
        this.network.titile !== "Custom Node"
      ) {
        const address = encodeAddress(
          decodeAddress(this.wallet.address),
          this.network.prefix
        );
        /* @ts-ignore */
        return `/${this.network.title.toLowerCase()}/${address}`;
      }
      return `/`;
    }
  }
});
</script>
