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
    const response = await fetch(`${props.apiEndpoint}/usuarios?email=${email.value}&senha=${senha.value}`);
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
    sessionStorage.setItem('primeiroNome', usuario.primeiroNome);
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
