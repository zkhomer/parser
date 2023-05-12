<template>
  <div class="wrap">
    <LeftMenu />
    <div class="maincontent">
      <h1>Data</h1>
      <ul>
        <li v-for="product in productList" :key="product.name">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-price">{{ product.price }}</div>
          <img :src="product.img" alt="Product Image" class="product-img" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import LeftMenu from "./LeftMenu.vue";
import { useStore } from '../store';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';

const store = useStore();
const { selectedCategory } = storeToRefs(store);
const productList = ref([]);

const pagesCategories = computed(() => selectedCategory.value);

onMounted(async () => {
  console.log(pagesCategories.value);
  await getCategoryDataFromServer();
});

const getCategoryDataFromServer = async () => {
  try {
    const userData = localStorage.getItem('user-data');
    if (!userData) {
      console.error('User data not found in local storage');
      return null;
    }
    const { cardSelector, customSelectors, pageUrl } = pagesCategories.value;
    console.log(cardSelector, customSelectors, pageUrl);
    const response = await axios.post('http://ec2-16-170-86-192.eu-north-1.compute.amazonaws.com/api', {
      cardSelector,
      customSelectors,
      pageUrl
    });
    console.log(response.data);
    productList.value = response.data.productList;
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
}
.maincontent {
  padding-left: 300px;
}
.product-img {
  max-width: 100px;
  max-height: 100px;
}
</style>
