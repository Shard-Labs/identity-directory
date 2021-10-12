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
      <div
        v-if="showUpdateButton"
        class="mb-2 flex flex-col justify-center items-center"
      >
        <button
          @click="updateMetadata"
          class="
            w-36
            block
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
          <span class="text-sm">Update Metadata</span>
        </button>
        <p class="italic text-sm text-pink">
          *Your extension metadata is out of date
        </p>
      </div>
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
import { base64Encode } from "@polkadot/util-crypto";
import { getSpecTypes } from "@polkadot/types-known";

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
      allAccounts: [],
      showUpdateButton: false,
      metadata: null
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
      setWallet: ActionTypes.SetWallet,
      setNotification: ActionTypes.SetNotification
    }),
    async checkWallets() {
      const extensions = await web3Enable("Identity Hub");
      if (extensions.length === 0) {
        return this.setNotification({
          type: "warning",
          message: "Please install Polkadot{.js} extension",
          show: true
        });
      }
      this.metadata = extensions[0].metadata;
      const { specVersion } = this.network.api.runtimeVersion.toHuman();
      const known = (await this.metadata.get()).filter(
        (el) => el.genesisHash === this.network.genesisHash
      );
      const isUpgredable =
        !known.length ||
        known.reduce(
          (acc, el) => (el.specVersion <= specVersion ? acc : el.specVersion),
          specVersion
        ) < specVersion;
      if (isUpgredable) {
        this.showUpdateButton = true;
      }
      const allAccounts = await web3Accounts();
      if (allAccounts.length) {
        this.showModal = true;
        this.allAccounts = allAccounts.filter(
          (wallet) =>
            this.network.genesisHash === wallet.meta.genesisHash ||
            !wallet.meta.genesisHash
        );
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
    },
    updateMetadata() {
      const { api } = this.network;
      const chain = api.runtimeChain.toHuman();
      const { specName, specVersion } = api.runtimeVersion.toHuman();
      const types = getSpecTypes(api.registry, chain, specName, specVersion);
      if (this.metadata) {
        const metaData = {
          chain,
          genesisHash: api.genesisHash.toHex(),
          icon: this.network.name === "polkadot" ? "polkadot" : "substrate",
          ss58Format: api.registry.chainSS58,
          specVersion: api.runtimeVersion.specVersion.toNumber(),
          tokenDecimals: api.registry.chainDecimals[0],
          tokenSymbol: api.registry.chainTokens[0],
          types,
          metaCalls: base64Encode(api.runtimeMetadata.asCallsOnly.toU8a())
        };
        this.metadata.provide(metaData);
        this.showUpdateButton = false;
      }
    }
  }
});
</script>

<style></style>
