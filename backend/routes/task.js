// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Ajouter une nouvelle tâche
router.post('/', auth, async (req, res) => {
  const { day, month, task } = req.body;

  const newTask = new Task({
    day,
    month,
    task,
    userId: req.user._id, // Associer la tâche à l'utilisateur authentifié
  });

  try {
    await newTask.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtenir toutes les tâches d'un utilisateur
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Vous pouvez ajouter d'autres routes pour mettre à jour ou supprimer des tâches

module.exports = router;
