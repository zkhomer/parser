<template>
  <div class="leftMenu__nav-wrapper">
    <nav>
      <ul>
        <li class="add">
          <div>+</div>
        </li>
        <li v-if="storeList[0]?.storBox" v-for="store of storeList[0].storBox" :key="store.id">
          <img class="list-img" :src="store.logo" alt="">
          <span>{{store.title}}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import {onMounted, defineProps, ref, watch} from 'vue';
import {useStore} from '../store';

let storeList = ref([]);

onMounted(async () => {
  await fetchUserData();
  console.log(storeList.value);
});

const fetchUserData = async () => {
  try {
    const parserStore = useStore();
    const userData = await parserStore.fetchUserData();
    if (userData) {
      console.log('User data:', userData);
      storeList.value.push(userData);
    } else {
      console.error('User data is null');
    }
  } catch (error) {
    console.error('Error sending query:', error);
  }
};
</script>

<style lang="scss" scoped>
.leftMenu__nav-wrapper {
  border: 1px solid black;
  background-color: #210d0d;
  position: fixed;
  left: 0px;
  top: 0;
  bottom: 0;
  max-width: 300px;
  transition: 0.4s ease-in;

  &:hover {
    left: 0;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  li {
    border: 1px solid #9ca3af;
    margin: 5px;
    cursor: pointer;
  }
}
.list-img{
  max-width: 100px;
}
.add{
  font-size: 25px;
  font-weight: bold;
}
</style>
