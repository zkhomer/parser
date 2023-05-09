<template>
  <div class="wrap">
    <LeftMenu />
    <div class="maincontent">
      <ul v-if="productList.length !== 0">
        <li v-for="(product, index) in productList" :key="index">
          <img class="product-img" :src="product.img" alt="" />
          {{ product.name }} - {{ product.price }}
        </li>
      </ul>
      <div v-else>
        Parsing page ...
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LeftMenu from "./LeftMenu.vue";
import PageList from './PageList.vue'
import { useStore } from "../store/index";

export default {
  components: { LeftMenu },
  data() {
    return {
      productList: [],
      page: 1,
      storeList:[]
    };
  },
  mounted() {
    axios
        .get("http://ec2-16-170-86-192.eu-north-1.compute.amazonaws.com/api", {
        })
        .then((response) => {
          this.productList = response.data.productList;
        })
        .catch((error) => {
          console.error(error);
        });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.wrap{
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
