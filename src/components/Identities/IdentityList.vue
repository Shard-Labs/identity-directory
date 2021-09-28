<template>
  <ul class="p-0">
    <li
      v-for="identity in identities"
      :key="identity.id"
      class="flex justify-between items-center mb-10 cursor-pointer"
      @click="() => handleSelectIdentity(identity.address)"
    >
      <div class="flex items-center">
        <Avatar
          :name="identity.legal"
          innerClass="w-12 h-12 mr-5"
          :email="identity && identity.email"
        />
        <div class="font-bold text-lg w-80 text-left">
          {{
            identity.legal ||
            identity.display ||
            identity.address.slice(0, 8) + "..."
          }}
        </div>
        <Badge
          v-if="identity.is_council_member"
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
      <p>{{ pagination.state }} of {{ totalResults }}</p>
    </div>
    <div>
      <p>Page:</p>
      <div class="flex">
        <button
          class="
            text-white
            border-solid border-pink
            rounded-full
            py-2
            px-2
            shadow-pink
            flex
            justify-between
            space-x-2
            inline-block
            bg-pink
            mr-2
          "
          @click="() => handleChangePageClicked(-1)"
        >
          <Icon name="prev" />
        </button>
        <button
          class="
            text-white
            border-solid border-pink
            rounded-full
            py-2
            px-2
            shadow-pink
            flex
            justify-between
            space-x-2
            inline-block
            bg-pink
          "
          @click="() => handleChangePageClicked(1)"
        >
          <Icon name="next" />
        </button>
      </div>
    </div>
    <div>
      <p>Page Size:</p>
      <div class="flex">
        <button
          v-for="i in [10, 15, 20, 25]"
          class="
            text-white
            border-solid border-pink
            rounded-full
            py-2
            px-4
            shadow-pink
            flex
            justify-between
            space-x-2
            inline-block
            mr-1
          "
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
    ...mapGetters(["pagination", "totalResults"])
  },
  methods: {
    ...mapActions({
      handleChangePage: ActionTypes.SetPaginationPage,
      handleChangeSizePerPage: ActionTypes.SetPaginationSize,
      startLoading: ActionTypes.SetIdentityListLoading
    }),
    async handleChangePageClicked(pageChanger) {
      this.startLoading(true);
      setTimeout(() => {
        this.handleChangePage(this.pagination.page + pageChanger);
      }, 0);
    },
    handleSelectIdentity(address) {
      const { network } = this.$route.params;
      this.$router.push({ name: "Identity", params: { address, network } });
    }
  }
};
</script>
