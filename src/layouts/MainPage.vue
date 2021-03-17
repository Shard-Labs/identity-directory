<template>
  <div class="container section">
    <div class="columns">
      <div class="column is-4">
        <sidebar />
      </div>
      <div class="column is-8">
        <header class="flex justify-around">
          <h1 class="font-black">Identity directory</h1>
          <button
            @click="connect"
            class="bg-pink border-solid border-pink rounded-full py-3 px-6 shadow-pink"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g data-name="Layer 2">
                <g data-name="log-in">
                  <path
                    d="M19 4h-2a1 1 0 000 2h1v12h-1a1 1 0 000 2h2a1 1 0 001-1V5a1 1 0 00-1-1zM11.8 7.4a1 1 0 00-1.6 1.2L12 11H4a1 1 0 000 2h8.09l-1.72 2.44a1 1 0 00.24 1.4 1 1 0 00.58.18 1 1 0 00.81-.42l2.82-4a1 1 0 000-1.18z"
                  />
                </g>
              </g>
            </svg>
            <span class="text-white">Connect</span>
          </button>
        </header>
        <Hero />
        <main>
          <h2 class="my-4">Identities</h2>
          <identity-list />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import IdentityList from "@/components/navigation/IdentityList.vue";
import Hero from "../components/navigation/Hero";
import SideBar from "../components/navigation/SideBar";
export default {
  name: "MainPage",
  components: {
    Hero,
    SideBar,
    IdentityList
  }
};
</script>
