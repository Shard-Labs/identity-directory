<template>
  <div>
    <div class="grid grid-cols-3 grid-rows-1 gap-9 mb-8">
      <identity-card v-for="card in cards" :identity="card" :key="card.id" />
    </div>
    <identity-list class="col-span-3" :identities="items" />
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
