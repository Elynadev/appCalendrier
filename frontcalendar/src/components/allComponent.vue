<template>
    <div>
      <!-- Tableau des tâches par mois -->
      <table class="mt-4 w-full border">
        <thead>
          <tr>
            <th class="border p-2">Mois</th>
            <th class="border p-2">Jour</th>
            <th class="border p-2">Tâche</th>
          </tr>
        </thead>
        <tbody>
          <!-- Boucle sur chaque mois -->
          <template v-for="month in months" :key="month.name">
            <!-- Ligne pour afficher le nom du mois -->
            <tr>
              <td class="border p-2 font-semibold" :rowspan="getTasksByMonth(month.name).length || 1">
                {{ month.name }}
              </td>
              <!-- Boucle sur chaque tâche du mois -->
              <template v-for="(task, index) in getTasksByMonth(month.name)" :key="task._id">
                <tr v-if="index === 0 || getTasksByMonth(month.name).length > 0">
                  <td class="border p-2">{{ task.day }}</td>
                  <td class="border p-2">{{ task.task }}</td>
                </tr>
              </template>
              <!-- Si aucun tâche pour ce mois -->
              <tr v-if="getTasksByMonth(month.name).length === 0">
                <td colspan="2" class="border p-2 text-gray-500">Aucune tâche pour ce mois</td>
              </tr>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        months: [
          { name: 'Janvier' },
          { name: 'Février' },
          { name: 'Mars' },
          { name: 'Avril' },
          { name: 'Mai' },
          { name: 'Juin' },
          { name: 'Juillet' },
          { name: 'Août' },
          { name: 'Septembre' },
          { name: 'Octobre' },
          { name: 'Novembre' },
          { name: 'Décembre' },
        ],
        tasks: [], // Liste des tâches
      };
    },
    methods: {
      getTasksByMonth(monthName) {
        // Filtrer les tâches par nom de mois
        return this.tasks.filter(task => task.month === monthName);
      },
      async fetchTasks() {
        const response = await TaskService.getAllTasks();
        this.tasks = response.data;
      },
    },
    mounted() {
      this.fetchTasks();
    },
  };
  </script>
  