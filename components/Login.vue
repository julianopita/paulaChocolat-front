<script setup>
import { ref } from 'vue';

const props = defineProps({
  apiEndpoint: {
    type: String,
    required: true,
  },
});

const email = ref('');
const senha = ref('');
const errorMessage = ref('');  // Corrigido para ser um ref reativo

const handleLogin = async () => {
  try {
    // Construindo a URL para a consulta do GET com a API Endpoint via props
    const response = await fetch(`${props.apiEndpoint}/login?email=${email.value}&senha=${senha.value}`);
    console.log(response);
    // Verificando se o usuário foi encontrado
    if (!response.ok) {
      throw new Error('Usuário não encontrado ou senha incorreta');
    }

    // Convertendo a resposta para JSON
    const usuarios = await response.json();
    console.log(usuarios);

    // Se não encontrar nenhum usuário
    if (usuarios.length === 0) {
      throw new Error('Usuário não encontrado ou senha incorreta');
    }

    // Usuário encontrado, armazenando o papel na sessão
    const usuario = usuarios[0]; // Considerando que o email seja único
    sessionStorage.setItem('papel', usuario.papel);
    console.log(usuario.papel);
    console.log(sessionStorage);

    // Redirecionar para a página principal ou outra página
    router.push('/');
  } catch (error) {
    // Exibindo mensagem de erro se houver
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <div>
    <h2>Login</h2>
    <div v-if="erro" class="error">{{ erro }}</div>
    <form @submit.prevent="handleLogin">
      <label for="email">Email</label>
      <input v-model="email" type="email" id="email" required />
      
      <label for="senha">Senha</label>
      <input v-model="senha" type="password" id="senha" required />
      
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

.error-message {
  color: red;
  font-size: 14px;
}
</style>
