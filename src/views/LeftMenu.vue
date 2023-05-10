<template>
  <div class="leftMenu__nav-wrapper">
    <nav>
      <ul>
        <li class="add">
          <div>+</div>
        </li>
        <li @click="()=> listHandler(store)" v-if="storeList[0]?.storBox" v-for="store of storeList[0].storBox"
            :key="store.id">
          <img class="list-img" :src="store.logo" alt="">
          <span>{{ store.title }}</span>
        </li>
      </ul>
    </nav>
    <button @click="logoutHandler">logOut</button>
  </div>
</template>

<script setup>
import {onMounted, defineProps, ref, watch} from 'vue';
import {useStore} from '../store';
import {storeToRefs} from 'pinia'
import { useRouter } from 'vue-router';

let storeList = ref([]);
let itemData = ref([])
const parserStore = useStore();
const router = useRouter();

const { currentTargetStore } = storeToRefs(parserStore);


onMounted(async () => {
  await fetchUserData();
});

const logoutHandler = ()=>{
  localStorage.setItem('user-data', '')
  router.push({ name: 'login-page' });

}

const listHandler = (item) => {
  itemData.value = item.pages
  parserStore.setCurrentStore(item)
  router.push({ name: 'pages' });
}

const fetchUserData = async () => {
  try {
    const userData = await parserStore.fetchUserData();
    if (userData) {
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
  max-width: 300px;
  transition: 0.4s ease-in;
  min-height: 100vh;
  @media (min-width: 768px) {
    min-width: 250px;
  }

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

.list-img {
  max-width: 100px;
}

.add {
  font-size: 25px;
  font-weight: bold;
}
</style>
