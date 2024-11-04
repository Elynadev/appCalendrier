<template>
    <div class="flex flex-col h-screen bg-blue-100">
      <!-- Navigation -->
      <nav class="bg-blue-700 text-white p-4 flex justify-between">
        <div class="flex space-x-4">
          <router-link to="/" class="hover:underline">Accueil</router-link>
          <router-link to="/home" class="hover:underline font-bold">Calendrier</router-link>
        </div>
        <div class="flex space-x-4">
          <!-- Optionnel : Autres liens -->
        </div>
      </nav>
  
      <!-- Header -->
      <header class="bg-white p-4 flex items-center justify-between shadow">
        <div class="flex items-center space-x-4">
          <button class="text-gray-500"><i class="fas fa-bars"></i></button>
          <input
            type="text"
            placeholder="Rechercher des personnes, des conversations, des fichiers, ..."
            class="bg-gray-100 p-2 rounded w-96"
          />
        </div>
        <div class="text-xl font-bold text-gray-700">glendale</div>
      </header>
  
      <!-- Welcome Section -->
      <main class="flex-1 p-8 bg-white flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold text-gray-700 mb-4">Bienvenue sur le Calendrier</h1>
        <p class="text-lg text-gray-600 mb-8">Organisez vos tâches et événements facilement avec notre calendrier interactif.</p>
        <router-link
          to="/calendrier"
          class="bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-800 mb-4"
        >Accéder au Calendrier</router-link>
        <a
          href="#"
          class="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600"
        >Ajouter rapidement un événement</a>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
  };
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  
  body {
    font-family: 'Roboto', sans-serif;
  }
  </style>
  