<template>
  <div>
    <header class="flex justify-between">
      <div class="flex justify-between items-center space-x-4 mb-8">
        <Icon name="logo" class="w-12" />
        <h1 class="font-black text-4xl text-left">Identity Hub</h1>
      </div>
      <Connect />
    </header>
    <div class="hero mt-6 p-10">
      <h1 class="font-black text-3xl text-left p-8">
        Search registered identities on
        {{ network.displayName || "Kusama or Polkadot" }} network
      </h1>
      <form @submit="handleSubmitSearch">
        <input-field
          :inputType="text"
          :name="identity"
          :id="identity"
          placeholder="Search identities by address, index, name..."
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

import { mapActions, mapGetters } from "vuex";
import { ActionTypes } from "@/store/actions";

import Icon from "@/components/common/Icon.vue";
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
    Connect,
    Icon
  },
  methods: {
    ...mapActions({
      getIdentityList: ActionTypes.GetIdentityList,
      searchIdentity: ActionTypes.SearchIdentity,
      setNotification: ActionTypes.SetNotification
    }),
    async handleSubmitSearch(event) {
      event.preventDefault();
      return this.handleSearch(this.address);
    },
    async handleSearch(query) {
      if (!query) {
        return;
      }
      if (!this.network) {
        return this.setNotification({
          type: "error",
          message: "Please Select Network First",
          show: true
        });
      }
      const address = await this.searchIdentity(query);
      if (address) {
        this.address = address;
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
