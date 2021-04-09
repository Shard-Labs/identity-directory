<template>
  <component :is="type" :label="label">
    <div class="relative flex" :class="containerClasses">
      <div :class="slotClasses">
        <slot></slot>
      </div>
      <input
        :type="inputType"
        :name="name"
        :id="id"
        :disabled="readOnly"
        :placeholder="placeholder"
        ref="input"
        :class="inputClasses"
        :value="value"
        @input="handleInput($event)"
      />
    </div>
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
    readOnly: { type: Boolean },
    label: { type: String, required: false },
    containerClasses: { type: String, default: "" },
    inputClasses: { type: String, default: "" },
    slotClasses: { type: String, default: "" }
  },
  methods: {
    handleInput(e) {
      const value = e.target.value === "" ? null : e.target.value;
      this.$emit("update", value);
    }
  }
};
</script>
