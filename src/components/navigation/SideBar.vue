<template>
  <div class="flex flex-col justify-around items-start w-full">
    <div class="flex justify-between space-x-4 mb-8">
      <Icon name="logo" />
      <h3 class="font-black text-xl">Polkaperson</h3>
    </div>
    <Dropdown
      class="mb-8"
      :data="networkList"
      :value="chain[0].title"
      :valueText="network ? network.title : 'Select Network'"
      @select="getSelectedDropDownDataIndex"
      prefixIcon="chain"
    />
    <InputField
      v-if="showCustomInput"
      class="w-full"
      inputType="text"
      name="identity"
      id="identity"
      placeholder="Custom Node Address"
      containerClasses="flex-grow bg-transparent border-solid border-pink rounded-full mb-4"
      inputClasses="py-2 font-medium"
      @update="handleInput"
    />
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { ActionTypes } from "@/store/actions";

import Icon from "@/components/common/Icon.vue";
import NavBar from "./NavBar.vue";
import Dropdown from "../common/Dropdown.vue";
import InputField from "../common/InputField.vue";

export default defineComponent({
  name: "Sidebar",
  components: {
    Icon,
    NavBar,
    InputField,
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
    ...mapGetters(["network", "networkList"]),
    selectedChainTitle() {
      return this.selectedChain ? this.selectedChain.title : "Select Network";
    },
    dropdownData() {
      return this.chain.title;
    },
    showCustomInput() {
      return this.network && this.network.custom;
    }
  },
  methods: {
    ...mapActions({
      selectNetwork: ActionTypes.SetNetwork,
      setNetworkProvider: ActionTypes.SetNetworkProvider
    }),
    async getSelectedDropDownDataIndex(index) {
      this.selectNetwork({ ...this.networkList[index] });
    },
    handleInput(value) {
      this.setNetworkProvider(value);
    }
  }
});
</script>
