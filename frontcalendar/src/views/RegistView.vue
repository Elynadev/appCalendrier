<template>
    <div class="flex items-center justify-center h-screen bg-blue-100">
      <div class="flex bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        <!-- Section gauche -->
        <div class="flex flex-col items-center justify-center bg-blue-50 p-10 flex-1">
          <img src="" alt="logo" class="w-72 h-72 object-cover mb-5" />
          <h2 class="text-blue-600 text-3xl font-bold mb-2">Mon Calendrier</h2>
          <p class="text-gray-600 text-center">Organisez votre emploi du temps avec facilité.</p>
        </div>
  
        <!-- Section droite -->
        <div class="flex flex-col items-center justify-center bg-blue-500 p-10 flex-1">
          <h2 class="text-white text-2xl font-bold mb-6">Inscrivez-vous pour rester connecté</h2>
          <form @submit.prevent="handleSignUp" class="w-full">
            <!-- Champ Nom -->
            <div class="form-group mb-5">
              <label for="name" class="block text-white mb-2">Nom</label>
              <input type="text" id="name" v-model="name" class="w-full p-3 rounded bg-white focus:outline-none" required />
            </div>
  
            <!-- Champ Email -->
            <div class="form-group mb-5 relative">
              <label for="email" class="block text-white mb-2">Email</label>
              <input type="email" id="email" v-model="email" class="w-full p-3 rounded bg-white focus:outline-none" required />
              <i class="fas fa-envelope absolute top-3 right-4 text-white-500"></i>
            </div>
  
            <!-- Champ Mot de passe -->
            <div class="form-group mb-5 relative">
              <label for="password" class="block text-white mb-2">Mot de passe</label>
              <input :type="passwordVisible ? 'text' : 'password'" id="password" v-model="password" class="w-full p-3 rounded bg-white focus:outline-none" required />
              <i class="fas fa-eye absolute top-3 right-4 text-white-500 cursor-pointer" @click="togglePasswordVisibility"></i>
            </div>
  
            <!-- Message d'erreur -->
            <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
  
            <!-- Bouton Inscription -->
            <div class="form-group mb-5">
              <button type="submit" class="w-full bg-blue-700 text-white p-3 rounded hover:bg-teal-800 transition duration-200">
                Inscription
              </button>
            </div>
  
            <!-- Lien vers Connexion -->
            <div class="form-group text-center">
              <p class="text-white mb-3">Vous avez déjà un compte ?</p>
              <button type="button" @click="goToLogin" class="w-full bg-white text-blue-600 p-3 rounded hover:bg-teal-100 transition duration-200">
                Connexion
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; // Assurez-vous d'installer axios
import { ref } from 'vue';
  
  export default {
    name: 'SignUp',
    setup() {
      const name = ref('');
      const email = ref('');
      const password = ref('');
      const passwordVisible = ref(false);
      const errorMessage = ref('');
  
      const togglePasswordVisibility = () => {
        passwordVisible.value = !passwordVisible.value;
      };
  
      const handleSignUp = async () => {
        try {
          const response = await axios.post('http://localhost:5002/auth/register', {
            username: name.value,
            email: email.value,
            password: password.value,
          });
          console.log('Utilisateur inscrit:', response.data);
          // Rediriger vers la page de connexion après l'inscription
          goToLogin();
        } catch (error) {
          errorMessage.value = error.response?.data?.message || 'Erreur lors de l\'inscription';
          console.error('Erreur:', errorMessage.value);
        }
      };
  
      const goToLogin = () => {
        // Logique pour rediriger vers la page de connexion
        window.location.href = '/login'; // Ou utiliser router.push({ name: 'Login' });
      };
  
      return {
        name,
        email,
        password,
        passwordVisible,
        togglePasswordVisibility,
        handleSignUp,
        goToLogin,
        errorMessage, // Pour afficher les messages d'erreur
      };
    },
  };
  </script>
  
  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
  </style>
  