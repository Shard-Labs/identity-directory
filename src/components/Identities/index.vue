<template>
  <div>
    <div class="grid grid-cols-3 grid-rows-1 gap-9 mb-8">
      <identity-card
        v-for="card in identityGridList"
        :identity="card"
        :key="card.id"
      />
    </div>
    <identity-list class="col-span-3" :identities="identityList" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

import IdentityCard from "./IdentityCard.vue";
import IdentityList from "./IdentityList.vue";

export default defineComponent({
  name: "Identities",
  components: {
    IdentityCard,
    IdentityList
  },
  data() {
    return {
      items: []
    };
  },
  computed: {
    ...mapGetters(["identityList", "identityGridList"])
  }
});
</script>

IdentityCard
