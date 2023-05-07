<template>
  <div class="login-form__wrapper">
    <div class="login-form__background"></div>
    <form  class="login-form__form" action="">
      <span class="error-msg" v-if="isError">pls enter correct data</span>
      <div class="login-form__input-group">
        <label>
          Login:
          <input v-model="login" class="login-form__input" type="text" placeholder="enter your Login ...">
        </label>
          <label>
            password:
            <input v-model="password" class="login-form__input" type="password" placeholder="enter your Password ...">
          </label>
      </div>
      <router-link tag="button" to="/" @click="loginHandler" class="login-form__btn" type="button">Login</router-link>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import {ref} from 'vue';

const login = ref('')
const password = ref('')
const isError = ref(false)

let loginHandler = () => {
  axios.post('http://ec2-16-170-86-192.eu-north-1.compute.amazonaws.com/user-login', {
    login: login.value,
    password: password.value,
  })
      .then(function (response) {
        const userData = response.data;
        if (userData) {
          localStorage.setItem('user-data', JSON.stringify(userData));
          isError.value = false;
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
  }
  &__input{
    height: 30px;
    border-radius: 7px;
    outline: none;
    border: none;
    margin-left: 5px;
    padding-left: 10px;
  }

}
.error-msg {
  color: red;
  font-weight: bold;
}
</style>
