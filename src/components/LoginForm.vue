<template>
  <div class="login-form__wrapper">
    <div class="login-form__background"></div>
    <form  class="login-form__form" action="">
      <span class="error-msg" v-if="isError">pls enter correct data</span>
      <div class="login-form__input-group">
        <label class="login-form__input-label" >
          Login:
          <input v-model="login" class="login-form__input" type="text" placeholder="enter your Login ...">
        </label>
        <label class="login-form__input-label">
          Password:
          <input v-model="password" class="login-form__input" type="password" placeholder="enter your Password ...">
        </label>
      </div>
      <button class="login-form__btn" type="button" @click="loginHandler">Login</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import {ref} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const login = ref('')
const password = ref('')
const isError = ref(false)

let loginHandler = () => {
  axios.post('http://localhost:3000/user-login', {
    login: login.value,
    password: password.value,
  })
      .then(function (response) {
        const userData = response.data;
        if (userData) {
          localStorage.setItem('user-data', JSON.stringify(userData));
          isError.value = false;
          router.push({ name: 'Home' });
        } else {
          localStorage.setItem('user-data', '');
          isError.value = true;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}
</script>

<style lang="scss" scoped>
.login-form{
  &__btn{
    background: linear-gradient(90deg, #06BFFF 0%, #2D73FF 100%);
    padding: 10px 0;
    text-align: center;
    color: white;
  }
  &__form{
    display: flex;
    position: relative;
    margin: 0 auto;
    z-index: 2;
    flex-direction: column;
    justify-content: center;
    border: 1px solid white;
    padding: 20px;
    border-radius: 10px;
    background: rgba(37, 46, 41, 0.91);
    backdrop-filter: blur(21px);
  }
  &__wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    max-width: 970px;
    height: 100vh;
  }
  &__background {
     position: absolute;
     top: 0;
     bottom: 0;
     left: 0;
     right: 0;
    background: radial-gradient(circle at center, #010310, #202225);
    -webkit-backdrop-filter: blur(2px);
     backdrop-filter: blur(2px);
   }
  &__input-group{
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    text-align: center;
    @media (max-width: 480px) {
      flex-wrap: wrap;
    }
  }
  &__input{
    height: 30px;
    border-radius: 7px;
    outline: none;
    border: none;
    margin-left: 5px;
    padding-left: 10px;

  }
  &__input-label{
    @media (max-width:  480px) {
      display: flex;
      flex-direction: column;
      width: 100%;

    }
  }

}
.error-msg {
  color: red;
  font-weight: bold;
}
</style>
