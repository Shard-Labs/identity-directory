<template>
  <div class="flex flex-col justify-center">
    <nav-link :exact="true" path="/" class="mb-8">
      <Icon name="identities" iconClass="mr-4" />
      <div class="text-base font-bold">
        Identity Directory
      </div>
    </nav-link>
    <nav-link :exact="true" path="/profile" class="mb-8">
      <Avatar class="mr-4" :style="{ width: '48px', height: '48px' }" />
      <div class="text-base font-bold">
        My Identity
      </div>
    </nav-link>
    <nav-link :exact="true" path="/settings" class="mb-8">
      <Icon name="settings" iconClass="mr-4" />
      <div class="text-base font-bold">
        Settings
      </div>
    </nav-link>
  </div>
</template>

<script>
import NavLink from "./NavLink.vue";
import Icon from "@/components/common/Icon.vue";
import Avatar from "@/components/common/Avatar.vue";
export default {
  name: "NavBar",
  components: {
    NavLink,
    Icon,
    Avatar
  }
};
</script>
