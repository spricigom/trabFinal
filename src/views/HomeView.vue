<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();

const usuario = reactive({
  email: '',
  senha: ''
})

function enviarLogin() {
  let error = false
  if (usuario.email == '') {
    alert("Faltou o email")
    error = true
  }
  if (usuario.senha == '') {
    alert("Faltou a senha")
    error = true
  }
  else {
    router.push({ path: '/filmes' });
  }
}
</script>
<template>
  <div class="teste">
    <form @submit.prevent="enviarLogin">
      <h1>Faça seu Login</h1>
      <div class="caixas">
      <input  type="email" placeholder="Digite seu Email" v-model="usuario.email">
      <input type="password" placeholder="Digite sua senha" v-model="usuario.senha">
    </div>
      <button type="submit" class="btn ">Concluido</button>
    </form>
  </div>
</template>
<style scoped>
h1{
  color: #fff;
  font-family: "Outfit", serif;
  margin-top: 30px;

}
form {
  display: flex;
  align-items: center;
  flex-direction: column; 
  width: 400px;
  height: 350px;
  background-color: black;
  border-radius: 10px;
}
.caixas{
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
}
input{
  font-size: 2.2vh;
  font-family: "Outfit", serif;
  width: 100%;
  height: 5vh;
  border-radius: 7px;
  background-color: rgb(231, 229, 229);
  border: .1px solid;
  margin-top: 20px;
  outline: none;
  padding: 7px;
}
button{
  margin-top: 5px; 
  margin-left: 40px; 
  margin-right: 40px; 
  margin-bottom: 50px; 
  width:45% ;
  height: 4.5vh;
  border-radius: 7.5px;
  font-family: "Outfit", serif;
  background-color: rgb(231, 229, 229);
  border: none;
  color: rgb(73, 73, 73);

}
.teste{
  height: 91.5vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  background: linear-gradient( black,#3e4344);
}
</style>