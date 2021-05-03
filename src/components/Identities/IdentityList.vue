<template>
  <ul class="p-0">
    <li
      v-for="identity in identities"
      :key="identity.id"
      class="flex justify-between items-center mb-10"
    >
      <div class="flex items-center">
        <Avatar
          :name="identity.attributes.identity_legal"
          innerClass="w-12 h-12 mr-5"
        />
        <div class="font-bold text-lg w-40 text-left">
          {{
            identity.attributes.identity_legal ||
              identity.attributes.identity_legal ||
              "No Info"
          }}
        </div>
        <Badge label="Council" color="yellow" prefixIcon="bulb" />
        <!-- <div>{{ identity.attributes.is_council_member ? "COUNCL" : "" }}</div> -->
      </div>
      <Icon name="arrow-right" />
    </li>
  </ul>
</template>

<script>
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
  mounted() {
    console.log(this.identities);
  }
};
</script>
