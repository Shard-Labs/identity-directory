<template>
  <closable-card :closed="closed">
    <template v-slot:header>
      <Icon name="treasury" />
      <h2 class="font-medium text-lg">Treasury</h2>
    </template>
    <template v-slot:body>
      Coming soon...
      <!-- <ul class="py-2">
        <li
          v-for="proposal in proposals"
          :key="proposal.id"
          class="flex items-center mb-8"
        >
          <Icon name="pencile" />
          <p class="text-left">
            <span class="text-sm font-bold text-left">
              Proposed a new tip with message - {{ proposal.message }}
            </span>
            <br />
            <span class="font-extralight text-xs text-gray-200">
              {{ proposal.timestamp }}
            </span>
          </p>
        </li>
      </ul> -->
    </template>
  </closable-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClosableCard from "@/components/Identity/cards/ClosableCard.vue";
import Icon from "@/components/common/Icon.vue";

export default defineComponent({
  name: "TreasuryCard",
  components: {
    ClosableCard,
    Icon
  },
  props: {
    closed: {
      type: Boolean
    }
  },
  data() {
    return {
      proposals: [
        {
          id: "1",
          message: "trying to become awesome",
          timestamp: "February 2, 2021 - 12:30 AM"
        },
        {
          id: "2",
          message: "polkaperson.com",
          timestamp: "February 1, 2021 - 3:30 PM"
        }
      ]
    };
  }
});
</script>
