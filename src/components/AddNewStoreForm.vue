<template>
  <div class="add-form__wrapper">

  <form class="add-form">
    <button class="add-form__close-btn" type="button" @click="isOpen">X</button>
    <h1>add new Store</h1>
    <div class="add-form__input-group">
      <label>
        Logo link:
        <input type="text" placeholder="enter link for logo">
      </label>
      <label>
        Store Name:
        <input type="text" placeholder=" enter store name">
      </label>
    </div>
    <button type="button"> Create new Store</button>
  </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import {ref, defineProps} from 'vue';


defineProps({
  isOpen: {
    required: false
  }
})


</script>

<style lang="scss" scoped>
.add-form__wrapper{
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
 min-width: 100%;
  min-height: 100vh;
  background-color: rgba(111, 49, 49, 0.7);
}
.add-form{
  max-width: 500px;
  position: relative;
  border: 1px solid #ffffff;
  &__input-group{
    display: flex;
    flex-direction: column;
    width: 100%;
  }
&__close-btn{
  border-radius: 20%;
  position: absolute;
  right: 5px;
  top: 5px;
}
}
</style>
