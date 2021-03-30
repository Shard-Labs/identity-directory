<template>
  <div id="hero">
    <h1>Search registered identities on Kusama or Polkadot network</h1>
    <form @submit.prevent="handleSubmit">
      <input-field
        :inputType="text"
        :name="identity"
        placeholder="Search identities by name, address..."
      />
    </form>
  </div>
</template>

<script>
import InputField from "../common/InputField.vue";
export default {
  components: { InputField },
  methods: {
    
  }
};
</script>

<style>
.hero {
  background: url("../../assets/images/hero.png"), #f8fafc;
}
</style>
