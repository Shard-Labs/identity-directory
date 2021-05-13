<template>
  <div>
    <Alert />
    <div class="grid grid-cols-4 p-8 m-4">
      <div class="col-span-1">
        <SideBar />
      </div>
      <div class="col-span-3">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SideBar from "@/components/navigation/SideBar.vue";
import Alert from "@/components/common/Alert.vue";

export default defineComponent({
  name: "MainPage",
  components: {
    Alert,
    SideBar
  }
});
</script>
<style>
.hero {
  background: url("../assets/images/hero.png"), #f8fafc;
  box-shadow: 1px 4px 6px #c6c6cd;
}
</style>
