<template>
  <div class="hero mt-6 p-10">
    <h1 class="font-black text-3xl text-left p-8">
      Search registered identities on Kusama or Polkadot network
    </h1>

    <input-field
      :inputType="text"
      :name="identity"
      :id="identity"
      placeholder="Search identities by name, address..."
      containerClasses="flex-grow bg-transparent border-solid border-pink rounded-full py-3 px-6"
      inputClasses="py-2 font-medium"
      @input="handleInput(event)"
    >
    </input-field>
  </div>
</template>

<script>
import InputField from "../common/InputField.vue";
export default {
  components: { InputField },
  methods: {}
};
</script>

<style>
.hero {
  background: url("../../assets/images/hero.png"), #f8fafc;
  box-shadow: 1px 4px 6px #c6c6cd;
}
</style>
