<template>
    <div class="relative flex" :class="containerClasses">
      <div :class="slotClasses">
        <slot></slot>
      </div>
      <span class="fa fa-search form-control-feedback">
        <img src="../../assets/search.png">
      </span>
      <input
        :type="inputType"
        :name="name"
        :id="id"
        :disabled="readOnly"
        :placeholder="placeholder"
        ref="input"
        :class="inputClasses"
        :value="value"
        class="SearchInputWithIcon"
        @input="handleInput($event)"
      />
    </div>
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
<style>
  .SearchInputWithIcon{
    width: 50%;
    border:2px solid #E6007A;
    border-radius: 25px;
    color: #e6007a;
    text-indent: 40px;
  }
  .SearchInputWithIcon:focus {
    outline: none;
  }
  .SearchInputWithIcon::-webkit-input-placeholder {
    color: #E6007A;
  }
  .form-control-feedback{
    position: absolute;
    z-index: 2;
    display: block;
    height: 5.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
    margin-top: 10px;
    width: 23px;
    margin-left: 10px;
  }
</style>