<template>
  <div class="flex flex-col justify-around items-start w-full">
    <div class="flex justify-between space-x-4 mb-8">
      <Icon name="logo" />
      <h3 class="font-black text-xl">Polkaperson</h3>
    </div>
    <Dropdown
      class="mb-8"
      :data="chain"
      :value="chain[0].title"
      :valueText="selectedChainTitle"
      @select="getSelectedDropDownDataIndex"
      prefixIcon="chain"
    />
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import Icon from "@/components/common/Icon.vue";
import { ApiPromise, WsProvider } from "@polkadot/api";
import NavBar from "./NavBar.vue";
import Dropdown from "../common/Dropdown.vue";

export default {
  name: "Sidebar",
  components: {
    Icon,
    NavBar,
    Dropdown
  },
  data() {
    return {
      chain: [
        { title: "Polkadot", wsProvider: "wss://rpc.polkadot.io" },
        { title: "Kusama", wsProvider: "wss://kusama-rpc.polkadot.io" }
      ],
      selectedChain: null
    };
  },
  computed: {
    selectedChainTitle() {
      return this.selectedChain ? this.selectedChain.title : "Select Network";
    },
    dropdownData() {
      return this.chain.title;
    }
  },
  methods: {
    async getSelectedDropDownDataIndex(index) {
      this.selectedChain = { ...this.chain[index] };

      const provider = new WsProvider(this.selectedChain.wsProvider);

      const api = await ApiPromise.create({ provider });

      console.log(api.genesisHash.toHex());

      console.log((api.isConnected, "isconnected"));
    }
  }
};
</script>
