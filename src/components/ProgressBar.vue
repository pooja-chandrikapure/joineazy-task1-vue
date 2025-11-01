<template>
  <div class="w-full bg-gray-200 rounded-full h-3 mt-2">
    <div class="bg-green-500 h-3 rounded-full transition-all" :style="{ width: progress + '%' }"></div>
  </div>
</template>
<script setup>
defineProps({ progress: { type: Number, required: true } })
</script>
