<template>
  <div
    class="flex items-center justify-between rounded-lg shadow-md px-6 mx-auto mt-2"
    :class="{
      'bg-green': alert.type === 'success',
      'bg-red-500': alert.type === 'error',
      'bg-yellow-200': alert.type === 'warning',
    }"
  >
    <strong class="font-medium text-white text-base">{{ alert.message }}</strong>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    alert: {
      type: Object,
      required: true
    }
  },
};
</script>
