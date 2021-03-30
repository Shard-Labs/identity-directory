<template>
  <router-link :to="path" v-slot="{ href, navigate, isActive, isExactActive }">
    <a
      class="flex flex-col justify-center items-center cursor-pointer outline-none p-1"
      :clas="(exact ? isExactActive : isActive)"
      :href="href"
      @click="navigate"
    >
      <slot></slot>
    </a>
  </router-link>
</template>

<script>
export default {
  name: "NavLink",
  props: {
    path: { type: String },
    exact: { type: String }
  }
};
</script>
