<template>
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