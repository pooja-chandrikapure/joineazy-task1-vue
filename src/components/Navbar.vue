<template>
  <nav class="bg-blue-600 text-white flex justify-between p-4">
    <h1 class="font-bold text-lg">Assignment Dashboard</h1>
    <div class="flex items-center gap-3">
      <label class="text-sm">Role:</label>
      <select v-model="localRole" @change="handleRoleChange" class="bg-blue-500 rounded px-2 py-1">
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({ modelValue: { type: String, default: 'student' } })
const emit = defineEmits(['update:role'])
const router = useRouter()

const localRole = ref(props.modelValue)
watch(() => props.modelValue, v => localRole.value = v)

function handleRoleChange() {
  emit('update:role', localRole.value)

  if (localRole.value === 'admin') {
    router.push('/admin')
  } else {
    // Default student route, use an ID or simple route
    router.push('/student') // replace student1 with dynamic ID if needed
  }
}
</script>
