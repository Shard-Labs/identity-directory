<template>
  <closable-card :closed="closed">
    <template v-slot:header>
      <Icon name="governance" />
      <h2 class="font-medium text-lg">Governance</h2>
    </template>
    <template v-slot:body>
      Coming soon...
      <!-- <ul>
        <li
          v-for="vote in votes"
          :key="vote.id"
          class="pt-2  text-left flex items-center  mb-8"
        >
          <Icon :name="vote.vote ? 'arrowUp' : 'arrowDown'" />
          <p>
            <span class="text-sm font-bold">
              Voted {{ vote.vote ? "positive" : "negative" }} on proposal #{{
                vote.id
              }}
            </span>
            <br />
            <span class="font-extralight text-xs text-gray-200">
              {{ vote.timestamp }}
            </span>
          </p>
        </li>
      </ul> -->
    </template>
  </closable-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import ClosableCard from "@/components/Identity/cards/ClosableCard.vue";
import Icon from "@/components/common/Icon.vue";

export default defineComponent({
  name: "GovernanceCard",
  props: {
    closed: {
      type: Boolean
    }
  },
  components: {
    ClosableCard,
    Icon
  },
  data() {
    return {
      votes: [
        { id: 15, vote: true, timestamp: "February 2, 2021 - 12:30 AM" },
        { id: 16, vote: false, timestamp: "February 1, 2021 - 3:30 PM" }
      ]
    };
  },
  computed: {
    ...mapGetters(["identity"])
  }
});
</script>
