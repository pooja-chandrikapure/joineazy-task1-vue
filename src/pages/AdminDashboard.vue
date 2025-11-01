<template>
  <div class="p-4">
    <h2 class="text-xl font-semibold mb-4">Admin Dashboard</h2>
    <div v-for="a in assignments" :key="a.id" class="border p-4 rounded mb-3 shadow">
      <h3 class="font-semibold text-lg">{{ a.title }}</h3>
      <p>{{ a.description }}</p>

      <ProgressBar :progress="getProgress(a)" />

      <ul class="mt-2 text-sm">
        <li v-for="s in a.submissions" :key="s.student" :class="s.submitted ? 'text-green-600' : 'text-red-600'">
          {{ s.student }} — {{ s.submitted ? 'Submitted' : 'Not Submitted' }}
        </li>
      </ul>

      <div class="mt-3">
        <input v-model="newTitle" placeholder="New assignment title" class="border px-2 py-1 mr-2" />
        <button @click="addAssignment" class="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProgressBar from '../components/ProgressBar.vue'

const STORAGE_KEY = 'joineazy_assignments_v1'
const assignments = ref([])
const newTitle = ref('')

onMounted(() => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if(raw){
    assignments.value = JSON.parse(raw)
  } else {
    import('../data/assignments.js').then(m => {
      assignments.value = m.mockAssignments
      localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments.value))
    })
  }
})

function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments.value)) }

function getProgress(a){
  const total = a.submissions.length || 1
  const completed = a.submissions.filter(s => s.submitted).length
  return Math.round((completed/total)*100)
}

function addAssignment(){
  if(!newTitle.value) return alert('Enter a title')
  const id = Date.now()
  assignments.value.push({
    id,
    title: newTitle.value,
    description: 'Added via admin UI',
    deadline: '2025-12-31',
    driveLink: '',
    submissions: [{ student: 'Pooja', submitted: false }, { student: 'John', submitted: false }]
  })
  newTitle.value = ''
  save()
  alert('Assignment added and persisted to localStorage')
}
</script>
