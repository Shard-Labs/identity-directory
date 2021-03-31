<template>
  <div>
    <!-- First three identities as cards -->
    <div>
      <div v-for="identity in firstThree" :key="identity.id" class="bg-red-800">
        {{ identity.name }}
      </div>
    </div>
    <!-- Rest of the identities as list items -->
    <div>
      <div
        v-for="identity in otherIdentities"
        :key="identity.id"
        class="bg-red-500"
      >
        {{ identity.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Testing",
  data() {
    return {
      // This is just an example. You will probably receive this via props or an API call here
      identities: [
        { id: 1, name: "Test 1" },
        { id: 2, name: "Test 2" },
        { id: 3, name: "Test 3" },
        { id: 4, name: "Test 4" },
        { id: 5, name: "Test 5" },
        { id: 6, name: "Test 6" }
      ]
    };
  },
  computed: {
    firstThree() {
      return this.identities.slice(0, 3);
    },
    otherIdentities() {
      return this.identities.slice(3);
    }
  }
};
</script>
