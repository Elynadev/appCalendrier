// backend/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Référence à l'utilisateur qui a créé la tâche
    required: true,
  },
  completed: {
    type: Boolean,
    default: false, // Indique si la tâche est complétée ou non
  },
}, { timestamps: true }); // Ajoute des timestamps pour la création et la mise à jour

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
