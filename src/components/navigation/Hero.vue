<template>
<header class="flex justify-around">
  <h1 class="font-black">Identity directory</h1>
  <button @click="connect" class="bg-pink border-solid border-pink rounded-full py-3 px-6 shadow-sm">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="log-in"><path d="M19 4h-2a1 1 0 000 2h1v12h-1a1 1 0 000 2h2a1 1 0 001-1V5a1 1 0 00-1-1zM11.8 7.4a1 1 0 00-1.6 1.2L12 11H4a1 1 0 000 2h8.09l-1.72 2.44a1 1 0 00.24 1.4 1 1 0 00.58.18 1 1 0 00.81-.42l2.82-4a1 1 0 000-1.18z"/></g></g></svg>
    <span class="text-white">Connect</span>
  </button>
</header>
<div class="hero">
  <h1>Search registered identities on Kusama or Polkadot network</h1>
  <form @submit.prevent="handleSubmit"> 
      <input-field :inputType="text" :name="identity" placeholder="Search identities by name, address..."  />
  </form>
</div>
</template>

<script>
import Button from '../common/Button.vue'
import InputField from '../common/InputField.vue'
export default {
  components: { InputField, Button },
  methods: {
    handleSubmit(){

    }
  }  
}
</script>

<style>
  .hero {
    background: url('../../assets/images/hero.png'), #f8fafc;
  }
</style>