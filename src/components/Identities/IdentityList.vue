<template>
  <ul class="p-0">
    <li
      v-for="identity in identities"
      :key="identity.id"
      class="flex justify-between items-center mb-10"
      @click="() => handleSelectIdentity(identity.attributes.address)"
    >
      <div class="flex items-center">
        <Avatar
          :name="identity.attributes.identity_legal"
          innerClass="w-12 h-12 mr-5"
        />
        <div class="font-bold text-lg w-40 text-left">
          {{
            identity.attributes.identity_legal ||
              identity.attributes.identity_display ||
              identity.attributes.address.slice(0, 8) + "..."
          }}
        </div>
        <Badge
          v-if="identity.attributes.is_council_member"
          label="Council"
          color="yellow-1100"
          prefixIcon="bulb"
        />
      </div>
      <Icon name="arrow-right" />
    </li>
  </ul>
  <div class="flex justify-around items-center">
    <div>
      <p>Viewing:</p>
      <p>{{ pagination.state }}</p>
    </div>
    <div>
      <p>Page:</p>
      <div class="flex">
        <button
          v-for="i in pages"
          class="text-white border-solid border-pink rounded-full py-2 px-4 shadow-pink flex justify-between space-x-2 inline-block"
          :class="{
            'bg-pink': i !== pagination.page,
            'bg-white': i === pagination.page,
            'text-pink': i === pagination.page
          }"
          :key="i"
          @click="() => handleChangePage(i)"
          :disabled="i === pagination.page"
        >
          {{ i }}
        </button>
      </div>
    </div>
    <div>
      <p>Page Size:</p>
      <div class="flex">
        <button
          v-for="i in [10, 15, 20, 25]"
          class="text-white border-solid border-pink rounded-full py-2 px-4 shadow-pink flex justify-between space-x-2 inline-block"
          :key="i"
          @click="() => handleChangeSizePerPage(i)"
          :class="{
            'bg-pink': i !== pagination.sizePerPage,
            'bg-white': i === pagination.sizePerPage,
            'text-pink': i === pagination.sizePerPage
          }"
          :disabled="i === pagination.sizePerPage"
        >
          {{ i }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ActionTypes } from "@/store/actions";

import Icon from "@/components/common/Icon.vue";
import Avatar from "@/components/common/Avatar.vue";
import Badge from "@/components/common/Badge.vue";

export default {
  name: "IdentityList",
  props: {
    identities: Array
  },
  components: {
    Icon,
    Avatar,
    Badge
  },
  computed: {
    ...mapGetters(["pagination"]),
    pages() {
      const pages = [1, 2, 3, 4, 5];
      return pages;
    }
  },
  methods: {
    ...mapActions({
      handleChangePage: ActionTypes.SetPaginationPage,
      handleChangeSizePerPage: ActionTypes.SetPaginationSize
    }),
    handleSelectIdentity(address) {
      this.$router.push({ name: "Identity", params: { address } });
    }
  }
};
</script>
