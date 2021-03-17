<template>
  <component :is="type" :label="label">
    <input
      :type="inputType"
      :name="name"
      :id="id"
      :disabled="readOnly"
      :placeholder="placeholder"
      ref="input"
      class="flex-grow bg-transparent border-solid border-pink rounded-full py-3 px-6"
      :value="value"
      @input="handleInput($event)"
    />
  </component>
</template>

<script>
export default {
  name: "InputField",
  props: {
    inputType: { type: String, required: true },
    placeholder: { type: String },
    value: { type: String },
    name: { type: String },
    id: { type: String },
    label: { type: String },
    readOnly: { type: Boolean }
  },
  methods: {
    handleInput(e) {
      const value = e.target.value === "" ? null : e.target.value;
      this.$emit("update", value);
    }
  }
};
</script>
