<template>
  <div class="add-form__wrapper">
    <form class="add-form">
      <button class="add-form__close-btn" type="button" @click="isOpen">X</button>
      <h1>add new Store</h1>
      <div class="add-form__input-group">
        <label>
          Logo link:
          <input v-model="logoLink" type="text" placeholder="enter link for logo">
        </label>
        <label>
          Store Name:
          <input v-model="storeName" type="text" placeholder=" enter store name">
        </label>
      </div>
      <button @click="addFormHandler" type="button"> Create new Store</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, defineProps } from 'vue';

const logoLink = ref('');
const storeName = ref('');

const { isOpen, loadData } = defineProps({
  isOpen: {
    required: false,
  },
  loadData: {
    required: false,
  },
});

const addFormHandler = () => {
  const userData = JSON.parse(localStorage.getItem('user-data'));
  const url = 'http://ec2-16-170-86-192.eu-north-1.compute.amazonaws.com/add-store';

  axios
      .post(url, {
        _id: userData._id,
        newStore: {
          title: storeName.value,
          logo: logoLink.value,
          pages: [],
        },
      })
      .then(function (response) {
        const userData = response.data;
        console.log(userData);
        if (userData) {
          localStorage.setItem('user-data', JSON.stringify(userData));
        } else {
          console.log('Error sending request');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  isOpen();
};
</script>

<style lang="scss" scoped>
.add-form__wrapper {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-width: 100%;
  min-height: 100vh;
  background-color: rgba(111, 49, 49, 0.7);
}

.add-form {
  max-width: 500px;
  position: relative;
  border: 1px solid #ffffff;

  &__input-group {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__close-btn {
    border-radius: 20%;
    position: absolute;
    right: 5px;
    top: 5px;
  }
}
</style>
