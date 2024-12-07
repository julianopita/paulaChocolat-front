<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { worker } from './mocks/browser';
worker.start();



const props = defineProps({
  apiEndpoint: {
    type: String,
    required: true,
  },
});

const email = ref('');
const senha = ref('');
const errorMessage = ref('');  // Corrigido para ser um ref reativo

// Variáveis de navegação
const router = useRouter();

const handleLogin = async () => {
  try {
    // Criando o corpo da requisição
    const body = JSON.stringify({ email: email.value, senha: senha.value });

    // Enviando a requisição POST para a API
    const response = await fetch(`${apiEndpoint}/login/usuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    // Verificando se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error('Usuário não encontrado ou senha incorreta');
    }

    // Convertendo a resposta para JSON
    const usuario = await response.json();

    // Armazenando o papel do usuário na sessão
    sessionStorage.setItem('papel', usuario.papel);
    sessionStorage.setItem('userId', usuario.id);
    sessionStorage.setItem('userEmail', usuario.email);

    // Redirecionando para a página principal ou outra página
    router.push('/');
  } catch (error) {
    // Exibindo mensagem de erro se houver
    errorMessage.value = error.message;
  }
};
</script>

<template>
    <main id="content">
  <div id="form-container">
    
    <div v-if="erro" class="error">{{ erro }}</div>
    <form id="formulario" @submit.prevent="handleLogin">
        <h2 id="titulo">Login</h2>
      <label for="email">Email</label>
      <input
       v-model="email"
       type="email"
       name="email"
       required />
      
      <label for="senha">Senha</label>
      <input
      v-model="senha"
      type="password"
      id="senha"
      required />
      <div id="botões">
      <button id="btn-enviar" type="submit">Entrar</button>
      </div>
    </form>
  </div>
  </main>
</template>
<style src="../assets/css/style.css"></style>
