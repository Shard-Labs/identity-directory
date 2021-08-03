<template>
  <div class="relative flex" :class="containerClasses">
    <div :class="slotClasses">
      <slot></slot>
    </div>
    <span class="fa fa-search form-control-feedback mt-1" v-if="prefixIcon">
      <Icon :name="prefixIcon" class="" />
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
      :style="{ 'text-indent': prefixIcon ? '40px' : '20px' }"
      @change="handleChange($event)"
      @input="handleInput($event)"
      :step="inputStep"
      :min="min"
    />
    <span class="form-control-feedback mt-1 right-16" v-if="postfixText">
      {{ postfixText }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Icon from "@/components/common/Icon.vue";

export default defineComponent({
  name: "InputField",
  data() {
    return {
      oldValue: ""
    };
  },
  components: {
    Icon
  },
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
    slotClasses: { type: String, default: "" },
    prefixIcon: { type: String },
    postfixText: { type: String },
    inputStep: { type: Number },
    min: { type: Number },
    decimals: { type: Number }
  },
  methods: {
    handleChange(e: Event) {
      const target = e.target as HTMLInputElement;

      const value = target.value === "" ? null : target.value;
      this.$emit("update", value);
    },
    handleInput(e: Event) {
      const target = e.target as HTMLInputElement;

      if (this.inputStep) {
        const valueNumber = Number(target.value);
        const decimalCheck =
          target.value.split(".")[1] && this.decimals
            ? target.value.split(".")[1].length > this.decimals
            : false;
        if ((this.inputStep > valueNumber && valueNumber > 0) || decimalCheck) {
          /* @ts-ignore */
          e.target.value = this.oldValue || this.inputStep;
        }
        if (this.inputStep && isNaN(valueNumber)) {
          /* @ts-ignore */
          e.target.value = 0;
        }
        /* @ts-ignore */
        e.target.value = valueNumber;
      }
      if (this.inputType === "number" && this.decimals) {
        if (target && target.value) {
          /* @ts-ignore */
          e.target.value = Number(target.value).toFixed(this.decimals);
        }
      }
      const value = target.value === "" ? null : target.value;
      if (value) {
        this.oldValue = value;
      }
      this.$emit("input", value);
    }
  }
});
</script>
<style>
.SearchInputWithIcon {
  width: 50%;
  border: 2px solid #e6007a;
  border-radius: 25px;
  color: #e6007a;
  text-indent: 20px;
  padding-right: 10px;
}
.SearchInputWithIcon:focus {
  outline: none;
}
.SearchInputWithIcon::-webkit-input-placeholder {
  color: #e6007a;
}
.form-control-feedback {
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
