<template>
  <div>
    <Modal :show="showModal" header="Account List" @close="handleCloseModal">
      <ul class="pb-8 px-10">
        <li
          v-for="account in allAccounts"
          :key="account.address"
          class="cursor-pointer"
          @click="() => selectWallet(account)"
        >
          <span class="font-bold">{{ account.meta.name }}</span> -
          <span>{{ translateAddress(account.address) }}</span>
        </li>
      </ul>
    </Modal>
    <div
      v-if="wallet"
      class="flex items-center cursor-pointer"
      @click="checkWallets"
    >
      <span class="text-lg font-extrabold">{{ wallet.meta.name }}</span>
      <Avatar
        :name="wallet.meta.name"
        innerClass="w-12 h-12 ml-4"
        :email="myIdentity && myIdentity.email"
      />
    </div>
    <div v-else>
      <button
        @click="checkWallets"
        class="
          bg-pink
          text-white
          border-solid border-pink
          rounded-full
          py-2
          px-4
          shadow-pink
          flex
          justify-between
          space-x-2
        "
      >
        <Icon name="connect" />
        <span class="font-medium">Connect</span>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { encodeAddress, decodeAddress } from "@polkadot/keyring";

import { mapActions, mapGetters } from "vuex";
import { ActionTypes } from "@/store/actions";

import Modal from "@/components/common/Modal.vue";
import Avatar from "@/components/common/Avatar.vue";
import Icon from "@/components/common/Icon.vue";

export default defineComponent({
  name: "Connect",
  data() {
    return {
      showModal: false,
      allAccounts: []
    };
  },
  components: {
    Avatar,
    Icon,
    Modal
  },
  computed: {
    ...mapGetters(["wallet", "myIdentity", "network"])
  },
  methods: {
    ...mapActions({
      setWallet: ActionTypes.SetWallet
    }),
    async checkWallets() {
      const extensions = await web3Enable("Identity Hub");
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
    },
    translateAddress(address) {
      return encodeAddress(decodeAddress(address), this.network.prefix);
    }
  }
});
</script>

<style></style>
