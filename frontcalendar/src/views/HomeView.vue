<template>
    <div id="home" class="p-6 bg-gray-100 min-h-screen">
      <!-- Affichage des mois si aucun mois n'est sélectionné -->
      <div v-if="!selectedMonth" class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div
          v-for="(month, index) in months"
          :key="index"
          class="p-4 bg-blue-300 rounded-lg shadow-lg cursor-pointer transition duration-300 transform hover:bg-blue-400 hover:scale-105"
          @click="selectMonth(index)"
        >
          <span class="font-bold text-lg text-blue-900">{{ month.name }}</span>
        </div>
      </div>
  
      <!-- Affichage des jours du mois sélectionné -->
      <div v-else>
        <h2 class="text-2xl font-semibold mb-4 text-blue-800">{{ months[selectedMonth].name }}</h2>
  
        <!-- Bouton de retour -->
        <button @click="deselectMonth" class="mb-4 px-4 py-2 bg-gray-400 rounded-lg shadow hover:bg-gray-500 transition duration-300">
          Retour aux mois
        </button>
  
        <!-- Grille des jours -->
        <div class="grid grid-cols-7 gap-4">
          <div
            v-for="day in generateDays(months[selectedMonth].days)"
            :key="day"
            class="p-4 bg-green-300 rounded-md shadow-md text-center cursor-pointer transition duration-300 transform hover:bg-green-400 hover:scale-105"
            @click="openTaskModal(day)"
          >
            <span class="font-semibold text-lg text-green-900">{{ day }}</span>
          </div>
        </div>
      </div>
  
      <!-- Modal pour ajouter une tâche -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h3 class="text-lg font-semibold text-blue-800">{{ editingTask ? 'Modifier la tâche' : 'Ajouter une tâche' }}</h3>
          <p class="text-gray-600">Date : {{ selectedDay }}/{{ months[selectedMonth].name }}</p>
          <input v-model="newTask.task" placeholder="Description de la tâche" class="border rounded p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
  
          <button @click="editingTask ? updateTask() : addNewTask()" class="mt-4 bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition duration-300">
            {{ editingTask ? 'Modifier' : 'Ajouter' }}
          </button>
          <button @click="closeModal" class="mt-2 bg-gray-300 text-black rounded p-2 hover:bg-gray-400 transition duration-300">Annuler</button>
        </div>
      </div>
  
      <!-- Liste des tâches enregistrées -->
      <table class="mt-6 w-full border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
        <thead class="bg-blue-200">
          <tr>
            <th class="border p-2">Mois</th>
            <th v-for="day in maxDays" :key="day" class="border p-2">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="month in months.slice(1)" :key="month.name">
            <td class="border p-2 font-bold">{{ month.name }}</td>
            <td v-for="day in maxDays" :key="day" class="border p-2">
              <ul>
                <li v-for="task in getTasksForMonthAndDay(month.name, day)" :key="task._id" class="border p-4 m-2 rounded shadow-md bg-gray-50">
                  {{ task.task }}
                  <div class="mt-2">
                    <button @click="deleteTask(task._id)" class="bg-red-400 text-white rounded p-1 hover:bg-red-500 transition duration-300">Supprimer</button>
                    <button @click="openEditModal(task)" class="bg-blue-500 text-white rounded p-1 hover:bg-blue-600 transition duration-300">Modifier</button>
                  </div>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import headerComponent from '../components/headerComponent.vue';
import TaskService from '../services/TaskService.js';
  
  export default {
    components: {
      headerComponent,
    },
    data() {
      return {
        months: [
          { name: '', days: 31 },
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
        ],
        tasks: [],
        selectedMonth: null,
        showModal: false,
        selectedDay: null,
        newTask: {
          task: '',
        },
        editingTask: false,
        taskToEdit: null,
        maxDays: 31,
      };
    },
    methods: {
      async fetchTasks() {
        const response = await TaskService.getAllTasks();
        this.tasks = response.data;
      },
      selectMonth(index) {
        this.selectedMonth = index;
      },
      deselectMonth() {
        this.selectedMonth = null;
      },
      generateDays(dayCount) {
        return Array.from({ length: dayCount }, (_, i) => i + 1);
      },
      openTaskModal(day) {
        this.selectedDay = day;
        this.showModal = true;
        this.editingTask = false; // Reset to adding mode
        this.newTask.task = ''; // Clear input for new task
      },
      closeModal() {
        this.showModal = false;
        this.newTask.task = '';
      },
      async addNewTask() {
        await TaskService.addTask({
          day: this.selectedDay,
          month: this.months[this.selectedMonth].name,
          task: this.newTask.task,
        });
        this.closeModal();
        this.fetchTasks();
      },
      async deleteTask(taskId) {
        await TaskService.deleteTask(taskId);
        this.fetchTasks();
      },
      openEditModal(task) {
        this.selectedDay = task.day; // Set the day to the task's day
        this.newTask.task = task.task; // Populate input with the task's description
        this.editingTask = true; // Switch to editing mode
        this.showModal = true; // Open the modal
        this.taskToEdit = task; // Keep a reference to the task being edited
      },
      async updateTask() {
        await TaskService.updateTask(this.taskToEdit._id, {
          day: this.selectedDay,
          month: this.months[this.selectedMonth].name,
          task: this.newTask.task,
        });
        this.closeModal();
        this.fetchTasks();
      },
      getTasksForMonthAndDay(month, day) {
        return this.tasks.filter(task => task.month === month && task.day === day);
      }
    },
    mounted() {
      this.fetchTasks();
    },
  };
  </script>
  
  <style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  </style>
  