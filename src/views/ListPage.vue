<template>
  <div>
    <Modal :show="showModal" header="Account List" @close="handleCloseModal">
      <ul class="pb-8  px-10">
        <li
          v-for="account in allAccounts"
          :key="account.address"
          class="cursor-pointer"
          @click="() => selectWallet(account)"
        >
          <span class="font-bold">{{ account.meta.name }}</span> -
          <span>{{ account.address }}</span>
        </li>
      </ul>
    </Modal>
    <header class="flex justify-between">
      <h1 class="font-black text-4xl text-left">Identity directory</h1>
      <button
        @click="checkWallets"
        class="bg-pink text-white border-solid border-pink rounded-full py-2 px-4 shadow-pink flex justify-between space-x-2"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0)" fill="#fff">
            <path
              d="M17 5h-2a1 1 0 100 2h1v12h-1a1 1 0 000 2h2a1 1 0 001-1V6a1 1 0 00-1-1zM9.8 8.4a1 1 0 00-1.6 1.2L10 12H2a1 1 0 000 2h8.09l-1.72 2.44A1 1 0 1010 17.6l2.82-4a1 1 0 000-1.18L9.8 8.4z"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="24" height="24" rx="12" fill="#fff" />
            </clipPath>
          </defs>
        </svg>
        <span class="font-medium">Connect</span>
      </button>
    </header>
    <div class="hero mt-6 p-10">
      <h1 class="font-black text-3xl text-left p-8">
        Search registered identities on Kusama or Polkadot network
      </h1>

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
import Modal from "@/components/common/Modal.vue";

export default defineComponent({
  name: "ListPage",
  components: {
    Identities,
    InputField,
    Modal
  },
  data() {
    return {
      showModal: false,
      allAccounts: []
    };
  },
  methods: {
    ...mapActions({
      getIdentityList: ActionTypes.GetIdentityList,
      searchIdentity: ActionTypes.SearchIdentity,
      setNotification: ActionTypes.SetNotification,
      setWallet: ActionTypes.SetWallet
    }),
    async handleSearch(address) {
      const valid = this.validateAddress(address);
      if (valid) {
        const exists = await this.searchIdentity(address);
        if (exists) {
          const { network } = this.$route;
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
    },
    async checkWallets() {
      const extensions = await web3Enable("Identity Directory");
      if (extensions.length === 0) {
        this.setNotification({
          type: "warning",
          message: "Extension not Installed!",
          show: true
        });
      }
      const allAccounts = await web3Accounts();
      if (allAccounts.length) {
        this.showModal = true;
        this.allAccounts = allAccounts;
      } else {
        this.setNotification({
          type: "warning",
          message: "There are no Account to connect to!",
          show: true
        });
      }
    },
    handleCloseModal() {
      this.showModal = false;
    },
    async selectWallet(wallet) {
      this.showModal = false;
      this.setWallet(wallet);
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
