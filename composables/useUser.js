// src/composables/useUser.js

import { reactive } from 'vue';

export const user = reactive({
  papel: '',
  nome: ''
});

export function setUser(papel, nome) {
  user.papel = papel;
  user.nome = nome;
  if (process.client) {
    sessionStorage.setItem('papel', papel);
    sessionStorage.setItem('primeiroNome', nome);
  }
}

export function clearUser() {
  user.papel = '';
  user.nome = '';
  if (process.client) {
    sessionStorage.removeItem('papel');
    sessionStorage.removeItem('primeiroNome');
  }
}

// Carregar o estado do usuário (do sessionStorage)
export function loadUser() {
  if (process.client) {
    const papel = sessionStorage.getItem('papel');
    const nome = sessionStorage.getItem('primeiroNome');
    if (papel && nome) {
      user.papel = papel;
      user.nome = nome;
    }
  }
}
