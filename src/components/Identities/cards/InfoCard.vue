<template>
  <closable-card>
    <template v-slot:header>
      <Icon name="info" />
      <h2 class="font-medium text-lg">Basic info</h2>
    </template>
    <template v-slot:body>
      <ul>
        <li class="pt-2">
          <span class="text-sm text-gray-400">Address</span>
          <span class="text-sm font-bold">
            { identity.attributes.address }
          </span>
        </li>
        <li class="pt-2">
          <span class="text-sm text-gray-400">Balance</span>
          <span class="text-sm font-bold">
            {{ identity.attributes.balance_total + " " + tokenSymbol }}</span
          >
        </li>
        <li class="pt-2">
          <span class="text-sm text-gray-400">Email address</span>
          <span class="text-sm font-bold">
            {{ identity.attributes.identity_email }}
          </span>
        </li>
        <li class="pt-2">
          <span class="text-sm text-gray-400">Website</span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            :href="[
              identity.attributes.identity_web
                ? identity.attributes.identity_web
                : null
            ]"
          >
            <span class="text-sm font-bold">
              {{ identity.attributes.identity_web }}
            </span>
          </a>
        </li>
        <li class="pt-2">
          <span class="text-sm text-gray-400">Element</span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            :href="[
              identity.attributes.identity_riot
                ? identity.attributes.identity_riot
                : null
            ]"
          >
            <span class="text-sm font-bold">
              {{ identity.attributes.identity_riot }}
            </span>
          </a>
        </li>
        <li class="pt-2">
          <span class="text-sm text-gray-400">Twitter</span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            :href="[
              identity.attributes.identity_twitter
                ? identity.attributes.identity_twitter
                : null
            ]"
          >
            <span class="text-sm font-bold">
              {{ identity.attributes.identity_twitter }}
            </span>
          </a>
        </li>
        <li class="pt-2">
          <span class="text-sm text-gray-400">Registar verifications</span>
          <span class="text-sm font-bold"> lala </span>
        </li>
      </ul>
    </template>
  </closable-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import ClosableCard from "@/components/Identities/cards/ClosableCard.vue";
import Icon from "@/components/common/Icon.vue";

export default defineComponent({
  name: "InfoCard",
  components: {
    ClosableCard,
    Icon
  },
  props: {
    identity: {
      type: Object,
      required: true
    }
  },
  // created: async () => {
  //   const properties = await api.rpc.system.properties();
  //   const tokenSymbol = properties.tokenSymbol;
  // },
  computed: {
    ...mapGetters(["identity", "network"])
  }
});
</script>
