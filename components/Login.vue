<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { setUser } from '../composables/useUser';

const props = defineProps({
  apiEndpoint: {
    type: String,
    required: true,
  },
});

const email = ref('');
const senha = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await fetch(`${props.apiEndpoint}/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        senha: senha.value,
      }),
    });

    if (!response.ok) {
      throw new Error('Credenciais inválidas');
    }

    const usuarios = await response.json();
    console.log(usuarios);
    if (usuarios.length === 0) {
      throw new Error('Usuário não encontrado ou senha incorreta');
    }

    const usuario = usuarios; // Assumindo que o email seja único
   /*  const papelApi = usuario.papel;  // Variável para armazenar o papel da resposta
    const nomeApi = usuario.primeiroNome;  // Variável para armazenar o nome da resposta */

    setUser(usuario.papel, usuario.primeiroNome);  // Atualiza o estado global

    console.log(usuario);
    console.log(usuario.papel);
    console.log(usuario.primeiroNome);
    console.log(sessionStorage); 
       

    /* papel.value = papelApi;
    nome.value = nomeApi;
    console.log(papel);
    console.log(nome); */

    // Redirecionar com base no papel
    if (usuario.papel === 'Gerente') {
      router.push('/gerenciar');
    } else if (usuario.papel === 'Cliente') {
      router.push('/meusOrcamentos');
    } else {
      throw new Error('Papel desconhecido. Entre em contato com o suporte.');
    }
  } catch (error) {
    errorMessage.value = error.message;
  }
};

</script>

<template>
  <main id="content">
    <div id="form-container">
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <form id="formulario" @submit.prevent="handleLogin">
        <h2 id="titulo">Login</h2>
        <label for="email">Email</label>
        <input v-model="email" type="email" name="email" required />
        <label for="senha">Senha</label>
        <input v-model="senha" type="password" id="senha" required />
        <div id="botões">
          <button id="btn-enviar" type="submit">Entrar</button>
          </div>
           <!-- Link para a página de cadastro -->
        <p id="link-cadastro">
          Não possui uma conta? <NuxtLink to="/cadastro">Cadastre-se aqui</NuxtLink>.
        </p>
      </form>
    </div>
  </main>
</template>

<style src="../assets/css/style.css"></style>
