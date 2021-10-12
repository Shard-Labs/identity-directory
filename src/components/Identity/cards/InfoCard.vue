<template>
  <closable-card :closed="closed">
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
        <li class="pt-2 text-left">
          <span class="text-sm text-gray-400">Parent Account</span>
          <br />
          <a v-if="identity && identity.parent" @click="goToParent">
            <span class="text-sm font-bold cursor-pointer">
              {{ identity.displayParent || identity.parent.toHuman() }}
            </span>
          </a>
          <span v-else class="text-sm font-bold break-words">No Parent</span>
        </li>
        <li class="pt-2 text-left">
          <span class="text-sm text-gray-400">Balance</span>
          <br />
          <span class="text-sm font-bold">
            {{ (identity && identity.balance) || 0 }}
          </span>
          <span class="text-sm">{{ ` ${token}` }}</span>
        </li>
        <li class="pt-2 text-left">
          <span class="text-sm text-gray-400">Free Balance</span>
          <br />
          <span class="text-sm font-bold">
            {{ (identity && identity.freeBalance) || 0 }}
          </span>
          <span class="text-sm">{{ ` ${token}` }}</span>
        </li>
        <li class="pt-2 text-left">
          <span class="text-sm text-gray-400">Reserved Balance</span>
          <br />
          <span class="text-sm font-bold">
            {{ (identity && identity.reservedBalance) || 0 }}
          </span>
          <span class="text-sm">{{ ` ${token}` }}</span>
        </li>
        <li class="pt-2 text-left">
          <span class="text-sm text-gray-400">Locked Balance</span>
          <br />
          <span class="text-sm font-bold">
            {{ (identity && identity.lockedBalance) || 0 }}
          </span>
          <span class="text-sm">{{ ` ${token}` }}</span>
        </li>
        <li class="pt-2 text-left">
          <span class="text-sm text-gray-400">Available Balance</span>
          <br />
          <span class="text-sm font-bold">
            {{ (identity && identity.availableBalance) || 0 }}
          </span>
          <span class="text-sm">{{ ` ${token}` }}</span>
        </li>
        <li class="pt-2 text-left">
          <span class="text-sm text-gray-400">Full Name</span>
          <br />
          <span class="text-sm font-bold">
            {{ (identity && identity.legal) || "No Info" }}
          </span>
        </li>
        <li class="pt-2 text-left">
          <span class="text-sm text-gray-400">Display Name</span>
          <br />
          <span class="text-sm font-bold">
            {{ (identity && identity.display) || "No Info" }}
          </span>
        </li>
        <li class="pt-2 text-left">
          <span class="text-sm text-gray-400">Email address</span>
          <br />
          <span class="text-sm font-bold">
            {{ (identity && identity.email) || "No Info" }}
          </span>
        </li>
        <li class="pt-2 text-left">
          <span class="text-sm text-gray-400">Website</span>
          <br />
          <a
            v-if="identity.web"
            target="_blank"
            rel="noopener noreferrer"
            :href="identity.web"
          >
            <span class="text-sm font-bold cursor-pointer">{{
              identity.web
            }}</span>
          </a>
          <span v-else class="text-sm font-bold">No Info</span>
        </li>
        <li class="pt-2 text-left">
          <span class="text-sm text-gray-400">Element</span>
          <br />
          <a
            v-if="identity && identity.riot"
            target="_blank"
            rel="noopener noreferrer"
            :href="`https://matrix.to/#/${identity.riot}`"
          >
            <span class="text-sm font-bold cursor-pointer">{{
              identity.riot
            }}</span>
          </a>
          <span v-else class="text-sm font-bold">No Info</span>
        </li>
        <li class="pt-2 text-left">
          <span class="text-sm text-gray-400">Twitter</span>
          <br />
          <a
            v-if="identity && identity.twitter"
            target="_blank"
            rel="noopener noreferrer"
            :href="`https://twitter.com/${identity.twitter}`"
          >
            <span class="text-sm font-bold cursor-pointer">
              {{ identity.twitter }}
            </span>
          </a>
          <span v-else class="text-sm font-bold">No Info</span>
        </li>
        <li class="pt-2 text-left text-sm font-normal">
          <span class="text-gray-300">Registar verifications</span>
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
  props: {
    closed: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(["identity", "network", "token", "judgement"]),
    address(): string | string[] {
      return this.$route.params.address;
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
    },
    goToParent() {
      const { network } = this.$route.params;
      const address = this.identity.parent.toHuman();
      this.$router.push({
        name: "Identity",
        params: { network, address }
      });
    }
  }
});
</script>
