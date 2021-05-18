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
          <span class="text-sm">{{ ` ${token}` }}</span>
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
        <li class="pt-2  text-left text-sm font-normal">
          <span class=" text-gray-300">Registar verifications</span>
          <br />
          <div v-if="identity">
            <p
              v-for="(judgement, index) in identity.judgements"
              :key="judgement + index"
            >
              <span class="text-sm font-bold">Registar {{ index + 1 }}</span>
              determined this identity as
              <span
                class="text-sm font-bold text-red"
                :class="judgementClass(judgement)"
                >{{ judgement }}</span
              >
            </p>
          </div>
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
    [`identity.judgements`](val) {
      console.log(val);
    }
  },
  methods: {
    judgementClass(judgement: string) {
      switch (judgement) {
        case "KnownGood":
        case "Reasonable":
          return {
            "text-green": true
          };
        default:
          return {
            "text-pink": true
          };
      }
    }
  }
});
</script>
