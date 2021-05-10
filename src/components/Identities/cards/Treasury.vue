<template>
  <closable-card>
    <template v-slot:header>
      <Icon name="treasury" />
      <h2 class="font-medium text-lg">Treasury</h2>
    </template>
    <template v-slot:body>
      <ul class="py-2">
        <li></li>
      </ul>
    </template>
  </closable-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClosableCard from "@/components/Identities/cards/ClosableCard.vue";
import Icon from "@/components/common/Icon.vue";

export default defineComponent({
  name: "TreasuryCard",
  components: {
    ClosableCard,
    Icon
  }
});
</script>
