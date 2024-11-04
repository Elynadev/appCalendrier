<template>
    <div class="flex items-center justify-center h-screen bg-blue-100">
      <div class="flex bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        <!-- Section gauche -->
        <div class="flex flex-col items-center justify-center bg-blue-50 p-10 flex-1">
          <img src="" alt="logo" class="w-72 h-72 object-cover mb-5"/>
          <h2 class="text-blue-600 text-3xl font-bold mb-2">Mon Calendrier</h2>
          <p class="text-gray-600 text-center">Soyez plus organisé.</p>
        </div>
  
        <!-- Section droite -->
        <div class="flex flex-col items-center justify-center bg-blue-500 p-10 flex-1">
          <h2 class="text-white text-2xl font-bold mb-6">Restez Connecté, avec les nouvelles tendances</h2>
          <form @submit.prevent="handleLogin" class="w-full">
            <!-- Champ Email -->
            <div class="form-group mb-5 relative">
              <label for="email" class="block text-white mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                class="w-full p-3 rounded bg-white focus:outline-none" 
                required 
              />
              <i class="fas fa-envelope absolute top-3 right-4 text-white-500"></i>
            </div>
            
            <!-- Champ Mot de passe -->
            <div class="form-group mb-5 relative">
              <label for="password" class="block text-white mb-2">Mot de passe</label>
              <input 
                type="password" 
                id="password" 
                v-model="password" 
                :type="passwordVisible ? 'text' : 'password'" 
                class="w-full p-3 rounded bg-white focus:outline-none" 
                required 
              />
              <i class="fas fa-eye absolute top-3 right-4 text-white-500 cursor-pointer" @click="togglePasswordVisibility"></i>
              <a href="#" class="text-white text-sm hover:underline block text-right mt-1">Mot de passe oublié ?</a>
            </div>
            
            <!-- Bouton Connexion -->
            <div class="form-group mb-5">
              <button 
                type="submit" 
                class="w-full bg-blue-700 text-white p-3 rounded hover:bg-teal-800 transition duration-200">
                Connexion
              </button>
            </div>
            
            <!-- Bouton Créer un compte -->
            <div class="form-group text-center">
              <p class="text-white mb-3">Vous n'avez pas un compte ?</p>
              <button 
                type="button" 
                class="w-full bg-white text-blue-600 p-3 rounded hover:bg-teal-100 transition duration-200"
                @click="goToSignUp">
                Créer un compte
              </button>
            </div>
          </form>
          <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
import { ref } from 'vue';
  
  export default {
    name: 'Login',
    setup() {
      const email = ref('');
      const password = ref('');
      const passwordVisible = ref(false);
      const errorMessage = ref('');
  
      const togglePasswordVisibility = () => {
        passwordVisible.value = !passwordVisible.value;
      };
  
      const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:5002/auth/login', {
            email: email.value,
            password: password.value,
          });
          console.log('Connexion réussie:', response.data);
          // Gérer le token ici (ex: le stocker dans le localStorage)
        } catch (error) {
          errorMessage.value = error.response.data.message || 'Erreur de connexion';
          console.error('Erreur de connexion:', errorMessage.value);
        }
      };
  
      const goToSignUp = () => {
        window.location.href = '/register'; // Logique pour rediriger vers la page d'inscription
      };
  
      return {
        email,
        password,
        passwordVisible,
        togglePasswordVisibility,
        handleLogin,
        goToSignUp,
        errorMessage,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Chargement de Font Awesome */
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
  </style>
  