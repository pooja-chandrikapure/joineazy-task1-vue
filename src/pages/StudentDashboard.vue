<template>
  <div class="p-4">
    <h2 class="text-xl font-semibold mb-4">My Assignments</h2>
    <div v-for="a in assignments" :key="a.id" class="border p-4 rounded mb-3 shadow">
      <h3 class="font-semibold text-lg">{{ a.title }}</h3>
      <p>{{ a.description }}</p>
      <p class="text-sm text-gray-500">Deadline: {{ a.deadline }}</p>
      <button @click="confirmSubmission(a.id)" class="bg-green-600 text-white mt-3 px-3 py-1 rounded">
        {{ confirmId === a.id ? "Click again to confirm" : "Mark as Submitted" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const confirmId = ref(null)
const assignments = ref([])

const STORAGE_KEY = 'joineazy_assignments_v1'

onMounted(() => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if(raw){
    assignments.value = JSON.parse(raw)
  } else {
    // load defaults from module
    import('../data/assignments.js').then(m => {
      assignments.value = m.mockAssignments
      localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments.value))
    })
  }
})

function save(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments.value))
}

function confirmSubmission(id){
  if(confirmId.value === id){
    // mark for current user Pooja as submitted
    const a = assignments.value.find(x => x.id === id)
    if(a){
      const s = a.submissions.find(ss => ss.student === 'Pooja')
      if(s) s.submitted = true
      save()
      alert('Submission confirmed and saved in localStorage!')
    }
    confirmId.value = null
  } else {
    confirmId.value = id
  }
}
</script>
