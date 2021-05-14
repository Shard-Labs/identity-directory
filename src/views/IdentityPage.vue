<template>
  <div>
    <header class="flex flex-col justify-between ">
      <h1 class="font-black text-4xl text-left mb-8">Identity</h1>
      <IdentityCard class="mb-10" />
      <div class="flex justify-between">
        <InfoCard class="w-1/3" />
        <Governance class="w-1/3" />
        <Treasury class="w-1/3" />
      </div>
    </header>
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

export default defineComponent({
  name: "IdentitiPage",
  components: {
    IdentityCard,
    InfoCard,
    Treasury,
    Governance
  },
  computed: {
    ...mapGetters(["network"]),
    name() {
      if (!this.identity || (this.identity && !this.identity.attributes)) {
        return "No Info";
      }
      return (
        this.identity.attributes.identity_legal ||
        this.identity.attributes.identity_display ||
        "No Name Information"
      );
    },
    image() {
      if (!this.identity || !this.identity.attributes) {
        return "No Info";
      }
      return this.identity.attributes.image || this.name;
    }
  },
  async created() {
    if (!this.network?.api) {
      this.$router.push({ name: "List" });
    }
    this.loading = true;
    const { address } = this.$route.params;
    if (address) {
      await this.getIdentity(address);
      this.loading = false;
    } else {
      this.$router.push({ name: "List" });
    }
  },
  methods: {
    ...mapActions({ getIdentity: ActionTypes.GetIdentity })
  }
});
</script>

<style></style>
