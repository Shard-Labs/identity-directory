<template>
  <div>
    <header class="flex justify-between">
      <h1 class="font-black text-4xl text-left">Identity directory</h1>
      <Connect />
    </header>
    <div class="hero mt-6 p-10">
      <h1 class="font-black text-3xl text-left p-8">
        Search registered identities on Kusama or Polkadot network
      </h1>
      <form @submit="handleSubmitSearch">
        <input-field
          :inputType="text"
          :name="identity"
          :id="identity"
          placeholder="Search identities by address..."
          containerClasses="flex-grow bg-transparent border-solid border-pink rounded-full py-3 px-6"
          inputClasses="py-2 font-medium"
          @update="handleSearch"
          prefixIcon="search"
        >
        </input-field>
      </form>
    </div>
    <main class="mt-6">
      <h2 class="font-black my-4 text-left text-2xl">Identities</h2>
      <Identities />
    </main>
  </div>
</template>

<script lagn="ts">
import { defineComponent } from "vue";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";

import { mapActions, mapGetters } from "vuex";
import { ActionTypes } from "@/store/actions";

import InputField from "../components/common/InputField.vue";
import Identities from "@/components/Identities/index.vue";
import Connect from "@/components/connect/Connect.vue";

export default defineComponent({
  name: "ListPage",
  data() {
    return {
      address: ""
    };
  },
  components: {
    Identities,
    InputField,
    Connect
  },
  methods: {
    ...mapActions({
      getIdentityList: ActionTypes.GetIdentityList,
      searchIdentity: ActionTypes.SearchIdentity,
      setNotification: ActionTypes.SetNotification,
    }),
    async handleSubmitSearch(event) {
      event.preventDefault();
      return this.handleSearch(this.address);
    },
    async handleSearch(address) {
      this.address = address;
      if (!this.network) {
        return this.setNotification({
          type: "error",
          message: "Please Select Network First",
          show: true
        });
      }
      const valid = this.validateAddress(address);
      if (valid) {
        const exists = await this.searchIdentity(address);
        if (exists) {
          const {
            params: { network }
          } = this.$route;
          return this.$router.push({
            name: "Identity",
            params: { address, network }
          });
        }
        return this.setNotification({
          type: "error",
          message: "Identity Not Found",
          show: true
        });
      }
      return this.setNotification({
        type: "error",
        message: "Invalid Address",
        show: true
      });
    },
    validateAddress(address) {
      try {
        encodeAddress(
          isHex(address) ? hexToU8a(address) : decodeAddress(address)
        );

        return true;
      } catch (error) {
        return false;
      }
    }
  },
  computed: {
    ...mapGetters(["network", "identityList"]),
    api() {
      return this.network?.api;
    }
  },
  watch: {
    api(val) {
      if (val) {
        this.getIdentityList();
      }
    }
  },
  created() {
    if (this.api && !this.identityList.length) {
      this.getIdentityList();
    }
  }
});
</script>

<style></style>
