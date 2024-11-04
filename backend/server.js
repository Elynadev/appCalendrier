// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('./models/Task');
const User = require('./models/User');
const auth = require('./middleware/auth'); // Import du middleware d'authentification
require('dotenv').config();
const authRoutes = require('./routes/auth');
const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(bodyParser.json());

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connecté à MongoDB');
})
.catch(err => {
  console.error('Erreur de connexion à MongoDB:', err);
});

// Utiliser les routes d'authentification
app.use('/auth', authRoutes);

// Endpoint pour ajouter une tâche
app.post('/tasks', auth, async (req, res) => {
  const { day, month, task } = req.body;

  // Validation des données d'entrée
  if (!day || !month || !task) {
    return res.status(400).send({ error: 'Tous les champs sont requis.' });
  }

  const newTask = new Task({ day, month, task, userId: req.user._id }); // Associer la tâche à l'utilisateur authentifié
  try {
    await newTask.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send({ error: 'Erreur lors de l\'ajout de la tâche' });
  }
});

// Endpoint pour récupérer toutes les tâches de l'utilisateur
app.get('/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }); // Filtrer les tâches par userId
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ error: 'Erreur lors de la récupération des tâches' });
  }
});

// Endpoint pour mettre à jour une tâche
app.put('/tasks/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { day, month, task } = req.body;

  // Validation des données d'entrée
  if (!day || !month || !task) {
    return res.status(400).send({ error: 'Tous les champs sont requis.' });
  }

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: req.user._id }, // Vérifier que la tâche appartient à l'utilisateur
      { day, month, task },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).send({ error: 'Tâche non trouvée ou accès non autorisé' });
    }
    res.send(updatedTask);
  } catch (error) {
    res.status(500).send({ error: 'Erreur lors de la mise à jour de la tâche' });
  }
});

// Endpoint pour supprimer une tâche
app.delete('/tasks/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: id, userId: req.user._id }); // Vérifier que la tâche appartient à l'utilisateur
    if (!deletedTask) {
      return res.status(404).send({ error: 'Tâche non trouvée ou accès non autorisé' });
    }
    res.send({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    res.status(500).send({ error: 'Erreur lors de la suppression de la tâche' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
