<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  apiEndpoint: {
    type: String,
    required: true,
  },
});

const email = ref('');
const senha = ref('');
const pNome = ref('');
const uNome = ref('');
const papel = ref('Cliente'); // Papel padrão como 'Cliente'
const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter();

const handleCadastro = async () => {
  try {
    const response = await fetch(`${props.apiEndpoint}/usuarios/cadastro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        primeiroNome: pNome.value,
        ultimoNome: uNome.value,
        email: email.value,
        senha: senha.value,   
        papel: papel.value,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao realizar cadastro. Tente novamente.');
    }

    successMessage.value = 'Cadastro realizado com sucesso!';
    setTimeout(() => {
      router.push('/login'); // Redireciona para o login após o cadastro
    }, 2000);
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <main id="content">
    <div id="form-container">
      <div v-if="successMessage" class="success">{{ successMessage }}</div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <form id="formulario" @submit.prevent="handleCadastro">
        <h2 id="titulo">Cadastro</h2>
        <label for="nome">Primeiro Nome</label>
        <input v-model="pNome" type="text" id="pNome" required />
        <label for="nome">Último Nome</label>
        <input v-model="uNome" type="text" id="uNome" required />
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required />
        <label for="senha">Senha</label>
        <input v-model="senha" type="password" id="senha" required />
        <div id="botões">
          <button id="btn-enviar" type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  </main>
</template>

<style>
.success {
  color: green;
  margin-bottom: 10px;
}
.error {
  color: red;
  margin-bottom: 10px;
}
</style>
