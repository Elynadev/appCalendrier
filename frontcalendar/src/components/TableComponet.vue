<template>
  <div class="bg-white p-6 shadow mt-4">
    <div class="text-2xl font-semibold mb-4">Mois de l'année</div>
    <div v-if="!selectedMonth" class="grid grid-cols-4 gap-4 text-center">
      <div
        v-for="(month, index) in months"
        :key="month.name"
        class="bg-blue-200 p-4 rounded-lg shadow hover:bg-blue-300 cursor-pointer"
        @click="goToMonth(index)"
      >
        {{ month.name }}
      </div>
    </div>

    <div v-else>
      <button @click="selectedMonth = null" class="mb-4 p-2 bg-red-400 rounded text-white">
        Retour aux mois
      </button>
      <DayComponent
        :monthName="months[selectedMonth].name"
        :days="generateDays(months[selectedMonth].days)"
        @click-day="openModal"
      />
    </div>

    <!-- Modal pour ajouter une tâche -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4">
          Ajouter une tâche pour le {{ selectedDay }} {{ months[selectedMonth].name }}
        </h2>
        <form @submit.prevent="addTask">
          <div class="mb-4">
            <label for="task" class="block text-sm font-medium text-gray-700">Tâche :</label>
            <input
              type="text"
              id="task"
              v-model="taskDescription"
              class="w-full p-2 border rounded"
              placeholder="Entrez la tâche"
              required
            />
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeModal" class="mr-2 px-4 py-2 bg-gray-400 rounded text-white">Annuler</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 rounded text-white">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DayComponent from './DayComponent.vue';

const months = ref([
  { name: '', days: 0 },
  { name: 'Janvier', days: 31 },
  { name: 'Février', days: 28 },
  { name: 'Mars', days: 31 },
  { name: 'Avril', days: 30 },
  { name: 'Mai', days: 31 },
  { name: 'Juin', days: 30 },
  { name: 'Juillet', days: 31 },
  { name: 'Août', days: 31 },
  { name: 'Septembre', days: 30 },
  { name: 'Octobre', days: 31 },
  { name: 'Novembre', days: 30 },
  { name: 'Décembre', days: 31 },
]);

const selectedMonth = ref(null); // Mois sélectionné
const showModal = ref(false); // Affiche ou masque le modal
const taskDescription = ref(''); // Description de la tâche
const selectedDay = ref(null); // Jour sélectionné

function goToMonth(monthIndex) {
  selectedMonth.value = monthIndex; // Définit le mois sélectionné
}

function generateDays(dayCount) {
  return Array.from({ length: dayCount }, (_, i) => i + 1); // Génère un tableau des jours
}

function openModal(day) {
  selectedDay.value = day; // Définit le jour sélectionné
  showModal.value = true; // Affiche le modal
}

function closeModal() {
  showModal.value = false; // Masque le modal
  taskDescription.value = ''; // Réinitialise la description de la tâche
}

function addTask() {
  console.log(`Tâche ajoutée pour le ${selectedDay.value} ${months[selectedMonth.value].name} : ${taskDescription.value}`);
  closeModal(); // Masque le modal après l'ajout
}
</script>
