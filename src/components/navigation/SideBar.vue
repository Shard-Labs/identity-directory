<template>
  <div class="flex flex-col justify-around items-start w-full">
    <Dropdown
      class="mb-8"
      :data="networkList"
      :value="networkList[0].title"
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

import NavBar from "./NavBar.vue";
import Dropdown from "../common/Dropdown.vue";
import InputField from "../common/InputField.vue";

export default defineComponent({
  name: "Sidebar",
  components: {
    NavBar,
    InputField,
    Dropdown
  },
  data() {
    return {
      selectedChain: null
    };
  },
  computed: {
    ...mapGetters(["network", "networkList", "polkadotNetwork"]),
    selectedChainTitle() {
      return this.selectedChain ? this.selectedChain.title : "Select Network";
    },
    dropdownData() {
      return this.chain.title;
    },
    showCustomInput() {
      return this.network && this.network.custom;
    },
    networkParam() {
      return this.$route.params.network;
    }
  },
  methods: {
    ...mapActions({
      selectNetwork: ActionTypes.SetNetwork,
      setNetworkProvider: ActionTypes.SetNetworkProvider,
      setNotification: ActionTypes.SetNotification,
      connect: ActionTypes.ConnectToNetwork
    }),
    async getSelectedDropDownDataIndex(index) {
      this.selectNetwork({ ...this.networkList[index] });
      const { title } = this.networkList[index];
      if (title !== "Custom Node") {
        this.connect();
      }
      this.$router.push({
        name: "ListWithNetwork",
        params: { network: title.toLowerCase() }
      });
    },
    handleInput(value) {
      this.setNetworkProvider(value);
      this.connect();
    },
    networkCheck() {
      const { network, networkParam } = this;
      if (network && network.title.toLowerCase() === networkParam) {
        return;
      }
      if (!network) {
        this.selectNetwork(this.polkadotNetwork);
        this.connect();
        this.$router.push({
          name: "ListWithNetwork",
          params: { network: this.polkadotNetwork.title.toLowerCase() }
        });
      }
      if (
        (networkParam && !network) ||
        (network && networkParam !== network.title.toLowerCase())
      ) {
        const networkObject = this.networkList.find(
          (el) => el.title.toLowerCase() === networkParam
        );
        if (!networkObject) {
          this.setNotification({
            type: "error",
            show: true,
            message: "Unsuported Network"
          });
          return this.$router.push({ name: "List" });
        }
        this.selectNetwork(networkObject);
        this.connect();
      }
    }
  },
  watch: {
    networkParam: function (newNetwork, oldNetwork) {
      if (newNetwork === oldNetwork) {
        return;
      } else if (!newNetwork && oldNetwork) {
        this.$router.push({
          name: "ListWithNetwork",
          params: { network: oldNetwork }
        });
      } else {
        this.networkCheck();
      }
    }
  },
  created() {
    this.networkCheck();
  }
});
</script>
