<template>
    <div>
      <h2 class="text-xl font-semibold mb-4">{{ monthName }}</h2>
      <div class="grid grid-cols-7 gap-4">
        <div
          v-for="day in days"
          :key="day"
          class="p-2 rounded-md shadow-md bg-green-200 text-center hover:bg-green-300 cursor-pointer"
          @click="openModal(day)"
        >
          {{ day }}
        </div>
      </div>
  
      <!-- Modal pour ajouter une tâche -->
      <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold mb-4">
            Ajouter une tâche pour le {{ selectedDay }} {{ monthName }}
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
  
  const props = defineProps({
    monthName: String,
    days: Array
  });
  
  const showModal = ref(false); // Contrôle l'affichage du modal
  const taskDescription = ref(''); // Description de la tâche
  const selectedDay = ref(null); // Jour sélectionné
  
  function openModal(day) {
    selectedDay.value = day; // Définit le jour sélectionné
    showModal.value = true; // Affiche le modal
  }
  
  function closeModal() {
    showModal.value = false; // Masque le modal
    taskDescription.value = ''; // Réinitialise la description de la tâche
  }
  
  function addTask() {
    console.log(`Tâche ajoutée pour le ${selectedDay.value} ${props.monthName} : ${taskDescription.value}`);
    closeModal(); // Masque le modal après l'ajout
  }
  </script>
  
  <style scoped>
  /* Styles pour centrer le modal */
  .fixed {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  