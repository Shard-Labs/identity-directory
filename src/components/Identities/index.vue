<template>
  <div class="relative">
    <div v-if="identityListLoading">
      <Loader :show="identityListLoading" />
    </div>
    <div v-else>
      <div class="grid grid-cols-3 grid-rows-1 gap-9 mb-8">
        <identity-card
          v-for="card in identityGridList"
          :identity="card"
          :key="card.id"
        />
      </div>
      <identity-list
        v-if="identityList.length"
        class="col-span-3"
        :identities="identityList"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

import IdentityCard from "./IdentityCard.vue";
import IdentityList from "./IdentityList.vue";
import Loader from "@/components/common/Loader.vue";

export default defineComponent({
  name: "Identities",
  components: {
    IdentityCard,
    IdentityList,
    Loader
  },
  data() {
    return {
      items: []
    };
  },
  computed: {
    ...mapGetters(["identityList", "identityGridList", "identityListLoading"])
  }
});
</script>

IdentityCard
