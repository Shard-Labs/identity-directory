<template>
  <closable-card>
    <template v-slot:header>
      <Icon name="basic-info" />
      <h2 class="font-medium text-lg">Basic info</h2>
    </template>
    <template v-slot:body>
      <ul>
        <li class="pt-2 pr-5 text-left">
          <span class="text-sm text-gray-400">Address</span>
          <br />
          <p class="text-sm font-bold break-words w-full">
            {{ address }}
          </p>
        </li>
        <li class="pt-2  text-left">
          <span class="text-sm text-gray-400">Balance</span>
          <br />
          <span class="text-sm font-bold">
            {{ (identity && identity.balance) || 0 }}
          </span>
          <span>{{ ` ${token}` }}</span>
        </li>
        <li class="pt-2  text-left">
          <span class="text-sm text-gray-400">Full Name</span>
          <br />
          <span class="text-sm font-bold">
            {{ (identity && identity.legal) || "No Info" }}
          </span>
        </li>
        <li class="pt-2  text-left">
          <span class="text-sm text-gray-400">Email address</span>
          <br />
          <span class="text-sm font-bold">
            {{ (identity && identity.email) || "No Info" }}
          </span>
        </li>
        <li class="pt-2  text-left">
          <span class="text-sm text-gray-400">Website</span>
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            :href="[web ? web : null]"
          >
            <span class="text-sm font-bold">
              {{ (identity && identity.web) || "No Info" }}
            </span>
          </a>
        </li>
        <li class="pt-2  text-left">
          <span class="text-sm text-gray-400">Element</span>
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            :href="[riot ? riot : null]"
          >
            <span class="text-sm font-bold">
              {{ (identity && identity.riot) || "No Info" }}
            </span>
          </a>
        </li>
        <li class="pt-2  text-left">
          <span class="text-sm text-gray-400">Twitter</span>
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            :href="[twitter ? twitter : null]"
          >
            <span class="text-sm font-bold">
              {{ (identity && identity.twitter) || "No Info" }}
            </span>
          </a>
        </li>
        <li class="pt-2  text-left">
          <span class="text-sm text-gray-300">Registar verifications</span>
          <br />
          <span class="text-sm font-bold"></span>
        </li>
      </ul>
    </template>
  </closable-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import ClosableCard from "@/components/Identity/cards/ClosableCard.vue";
import Icon from "@/components/common/Icon.vue";

export default defineComponent({
  name: "InfoCard",
  components: {
    ClosableCard,
    Icon
  },
  computed: {
    ...mapGetters(["identity", "network", "token"]),
    address(): string | string[] {
      return this.$route.params.address;
    }
  },
  watch: {
    identity(val) {
      console.log(val);
    }
  }
});
</script>
