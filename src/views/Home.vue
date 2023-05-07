<template>
  <LeftMenu/>
  <div class="maincontent">
    <h1>page:{{page}}</h1>
    <button @click="sendQuery" >check user from DB</button>
    <ul v-if="productList.length !== 0">
      <li v-for="(product, index) in productList" :key="index">
        <img class="product-img" :src="product.img" alt="">
        {{ product.name }} - {{ product.price }}
      </li>
    </ul>
    <div v-else>
      Parsing new page ...
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import LeftMenu from './LeftMenu.vue';

export default {
  components: {LeftMenu},
  data() {
    return {
      productList: [],
      page: 1,
    };
  },
  mounted() {
    axios.get('http://ec2-16-170-86-192.eu-north-1.compute.amazonaws.com/api',{data: 'ololo'})
        .then(response => {
          this.productList = response.data.productList
        })
        .catch(error => {
          console.error(error);
        });
  },
  methods:{
    sendQuery() {
      // const token = `1626093590:AAHZTkCDkjUA2fjm48Y6_W7RD1qgQTC1GNg`
      // const chatId = `-542959091`
      // let url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${this.productList.reduce((acc, cur) => {
      //   return acc + `Name: ${cur.name} || Price: ${cur.price},\n`;
      // }, "")}`
      // fetch(url)
      //     .then(response => response.json())
      //     .then(data => console.log(data))
      //     .catch(error => console.error(error))
      // console.log(this.productList)
      axios.post('http://localhost:3000/user-login', {
        login: 'ivanov90',
        password: '3jkslal'
      })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    nextPage(){
      this.page++
      this.productList = []
      axios.get(`http://localhost:3000/scrape/${this.page}`)
          .then(response => {
            console.log(response);
            this.productList = response.data.productList
          })
          .catch(error => {
            console.error(error);
          });
    },
    prevPage(){
      this.page--
      this.productList = []
      axios.get(`http://localhost:3000/scrape/${this.page}`)
          .then(response => {
            console.log(response);
            this.productList = response.data.productList
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
};
</script>

<style lang="scss" scoped>
.maincontent{
  padding-left: 300px;
}
.product-img{
  max-width: 100px;
  max-height: 100px;
}
</style>
