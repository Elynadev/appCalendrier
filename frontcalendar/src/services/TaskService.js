// frontend/src/services/TaskService.js
import axios from 'axios';

const API_URL = 'http://localhost:5002/tasks';

export default {
  // Récupérer toutes les tâches
  getAllTasks() {
    return axios.get(API_URL);
  },

  // Ajouter une tâche
  addTask(task) {
    return axios.post(API_URL, task);
  },

  // Mettre à jour une tâche
  updateTask(id, updatedTask) {
    return axios.put(`${API_URL}/${id}`, updatedTask);
  },

  // Supprimer une tâche
  deleteTask(id) {
    return axios.delete(`${API_URL}/${id}`);
  },
};
