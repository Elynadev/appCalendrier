<!-- frontend/src/App.vue -->
<template>
    <div id="app">
      <h1>Gestion des Tâches</h1>
      <form @submit.prevent="addNewTask">
        <input v-model="newTask.day" placeholder="Jour" required />
        <input v-model="newTask.month" placeholder="Mois" required />
        <input v-model="newTask.task" placeholder="Description" required />
        <button type="submit">Ajouter</button>
      </form>
  
      <ul>
        <li v-for="task in tasks" :key="task._id">
          {{ task.day }}/{{ task.month }} - {{ task.task }}
          <button @click="deleteTask(task._id)">Supprimer</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import TaskService from '../services/TaskService.js';
  
  export default {
    data() {
      return {
        tasks: [],
        newTask: {
          day: '',
          month: '',
          task: '',
        },
      };
    },
    methods: {
      async fetchTasks() {
        const response = await TaskService.getAllTasks();
        this.tasks = response.data;
      },
      async addNewTask() {
        await TaskService.addTask(this.newTask);
        this.newTask = { day: '', month: '', task: '' };
        this.fetchTasks();
      },
      async deleteTask(id) {
        await TaskService.deleteTask(id);
        this.fetchTasks();
      },
    },
    mounted() {
      this.fetchTasks();
    },
  };
  </script>
  