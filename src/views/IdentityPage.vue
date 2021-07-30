<template>
  <div>
    <Modal :show="showModal" @close="handleCloseModal" header="Send Tokens">
      <form
        @submit.prevent="handleSendTokens"
        @keydown.enter.prevent="handleSendTokens"
        class="pb-10 flex flex-col items-center"
      >
        <span class="text-lg">Amount</span>
        <input-field
          inputType="number"
          :name="identity"
          :id="identity"
          containerClasses="w-full bg-transparent border-solid border-pink rounded-full py-3 px-6"
          inputClasses="py-2 font-medium w-full"
          @update="handleChangeAmount"
          :step="network.minAmount"
          :min="0"
        />
        <button
          class="
            mt-4
            mix-w-12
            max-h-10
            font-medium
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
          Send
        </button>
      </form>
    </Modal>
    <header class="flex justify-between">
      <h1 class="font-black text-4xl text-left mb-8">Identity</h1>
      <Connect />
    </header>
    <main class="relative">
      <Loader :show="loading || identityLoading" />
      <div v-if="identity && !identityLoading">
        <IdentityCard class="mb-10" @sendToken="handleShowModal" />
        <div class="flex justify-between">
          <InfoCard class="w-1/3" />
          <Governance class="w-1/3" />
          <Treasury class="w-1/3" />
        </div>
      </div>
    </main>
  </div>
</template>

<script lagn="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { ActionTypes } from "@/store/actions";

import IdentityCard from "@/components/Identity/Identity.vue";
import InfoCard from "@/components/Identity/cards/InfoCard.vue";
import Treasury from "@/components/Identity/cards/Treasury.vue";
import Governance from "@/components/Identity/cards/Governance.vue";
import Modal from "@/components/common/Modal";
import InputField from "@/components/common/InputField.vue";
import Loader from "@/components/common/Loader.vue";
import Connect from "@/components/connect/Connect.vue";

export default defineComponent({
  name: "IdentitiPage",
  components: {
    IdentityCard,
    InfoCard,
    Treasury,
    Governance,
    Modal,
    Connect,
    InputField,
    Loader
  },
  data() {
    return {
      loading: true,
      showModal: false,
      amount: 0
    };
  },
  computed: {
    ...mapGetters(["network", "identityLoading", "identity", "wallet"]),
    api() {
      return this.network && this.network.api;
    }
  },
  async created() {
    if (this.api) {
      await this.fetchIdentity();
    }
  },
  watch: {
    api() {
      this.fetchIdentity();
    }
  },
  methods: {
    ...mapActions({
      getIdentity: ActionTypes.GetIdentity,
      sendTokens: ActionTypes.SendTokens,
      setNotification: ActionTypes.SetNotification
    }),
    async fetchIdentity() {
      const { address } = this.$route.params;
      if (address) {
        await this.getIdentity(address);
        this.loading = false;
      } else {
        this.$router.push({ name: "List" });
      }
    },
    handleShowModal() {
      if (this.wallet) {
        this.showModal = true;
      } else {
        this.setNotification({
          type: "error",
          show: true,
          message: "Please connect your wallet before sending tokens"
        });
      }
    },
    handleCloseModal() {
      this.showModal = false;
    },
    handleChangeAmount(amount) {
      this.amount = amount;
    },
    handleSendTokens() {
      const { address } = this.$route.params;
      const { amount } = this;
      this.sendTokens({ amount, address });
      this.amount = 0;
    }
  }
});
</script>

<style></style>
