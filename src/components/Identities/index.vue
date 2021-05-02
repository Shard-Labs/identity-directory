<template>
  <div class="grid grid-cols-3 grid-rows-2">
    <identity-card v-for="card in cards" :identity="card" :key="card.id" />
    <identity-list class="col-span-3" />
  </div>
</template>
<script>
import IdentityCard from "./IdentityCard.vue";
import IdentityList from "./IdentityList.vue";

export default {
  name: "Identities",
  components: {
    IdentityCard,
    IdentityList
  },
  data() {
    return {
      items: [],
    };
  },
  computed: {
    cards() {
      return this.items.slice(0, 3);
    },
    identities() {
      return this.items.slice(3);
    }
  }
};
</script>

IdentityCard
