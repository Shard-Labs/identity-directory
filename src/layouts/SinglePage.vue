<template>
  <div class="grid grid-cols-4 p-8 m-4">
    <div class="col-span-1">
      <SideBar />
    </div>
    <div class="col-span-3">
      <header class="flex justify-between">
        <h1 class="font-black text-4xl text-left">Identity</h1>
        <div>
          <h2 class="font-extrabold text-xl">
            {{ identity.attributes.identity_legal || "No Name" }}
          </h2>
          <Avatar
            :name="identity.attributes.identity_legal"
            innerClass="md:w-48 md:h-48"
          />
        </div>
      </header>
      <div class="hero mt-6 p-10">
        <single-identity-card></single-identity-card>
      </div>
      <main class="mt-6"></main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "@/components/navigation/SideBar.vue";
import SingleIdentityCard from "@/components/Identities/SingleIdentityCard.vue";
export default defineComponent({
  name: "SinglePage",
  components: {
    SideBar,
    SingleIdentityCard
  }
});
</script>
<style>
.hero {
  background: url("../assets/images/hero.png"), #f8fafc;
  box-shadow: 1px 4px 6px #c6c6cd;
}
</style>
