<template>
  <div class="grid grid-cols-4 p-8 m-4">
    <div class="col-span-1">
      <SideBar />
    </div>
    <div class="col-span-3">
      <header class="flex justify-between">
        <h1 class="font-black text-4xl text-left">Identity directory</h1>
        <button
          @click="connect"
          class="bg-pink text-white border-solid border-pink rounded-full py-2 px-4 shadow-pink flex justify-between space-x-2"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)" fill="#fff">
              <path
                d="M17 5h-2a1 1 0 100 2h1v12h-1a1 1 0 000 2h2a1 1 0 001-1V6a1 1 0 00-1-1zM9.8 8.4a1 1 0 00-1.6 1.2L10 12H2a1 1 0 000 2h8.09l-1.72 2.44A1 1 0 1010 17.6l2.82-4a1 1 0 000-1.18L9.8 8.4z"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="24" height="24" rx="12" fill="#fff" />
              </clipPath>
            </defs>
          </svg>
          <span class="font-medium">Connect</span>
        </button>
      </header>
      <Hero />
      <main class="mt-6">
        <h2 class="font-black my-4 text-left text-2xl">Identities</h2>
        <identity-list>
          <testing />
        </identity-list>
      </main>
    </div>
  </div>
</template>

<script>
import IdentityList from "@/components/navigation/IdentityList.vue";
import Hero from "@/components/navigation/Hero";
import SideBar from "@/components/navigation/SideBar";
import Testing from "@/views/Testing.vue";
export default {
  name: "MainPage",
  components: {
    Hero,
    SideBar,
    IdentityList,
    Testing
  }
};
</script>
