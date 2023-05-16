<template>
  <div class="wrap">
    <LeftMenu />
    <div class="category-info__wrapper">
      <h1 class="category-info__title"
          v-if="pagesCategories.pageUrl">
        Page link:
        <a :href="pagesCategories.pageUrl">
          {{pagesCategories.pageUrl}}
        </a>
      </h1>
      <ul class="category-list">
        <li class="category-list__item" v-for="product in productList" :key="product.name">
          <div class="category-list__item-wrapper">
            <img :src="product.imgUrl" alt="Product Image" class="product-img" />
            <div class="product-name">{{ product.name }}</div>
            <div class="product-price"> cost: {{ product.price }}</div>
          </div>
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
    const response = await axios.post('http://ec2-16-170-86-192.eu-north-1.compute.amazonaws.com/api', {
      cardSelector,
      customSelectors,
      pageUrl
    });
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
  .category-list{
    list-style: none;
    padding-left: 20px;
    text-align: left;
    display: flex;
    gap: 20px;
    flex-direction: column;
    &__item-wrapper{
      border: 1px solid white;
      max-width: 250px;
      padding: 5px;
    }
  }
  .category-info__title{
    font-size: 20px;
  }
  .product-img {
    max-width: 100px;
    max-height: 100px;
  }
}

</style>
