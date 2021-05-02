<template>
  <ul class="p-0">
    <li v-for="identity in identities" :key="identity.id">identity</li>
  </ul>
</template>

<script>
export default {
  name: "IdentityList",
  props: {
    identities: Array
  }
};
</script>
