<template>
  <div class="maincontent">
    <h1>page:{{page}}</h1>
    <button @click="sendQuery" >send for my Telegram</button>
    <button :disabled="productList.length === 0 || page < 2" @click="prevPage">prev page</button>
    <button :disabled="productList.length === 0" @click="nextPage">next page</button>
    <ul v-if="productList.length !== 0">
      <li v-for="(product, index) in productList" :key="index">
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

export default {
  data() {
    return {
      productList: [],
      page: 1,
    };
  },
  mounted() {
    axios.get('http://ec2-16-170-86-192.eu-north-1.compute.amazonaws.com/scrape/1',{data: 'ololo'})
        .then(response => {
          this.productList = response.data.productList
        })
        .catch(error => {
          console.error(error);
        });
  },
  methods:{
    sendQuery() {
      const token = `1626093590:AAHZTkCDkjUA2fjm48Y6_W7RD1qgQTC1GNg`
      const chatId = `-542959091`
      let url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${this.productList.reduce((acc, cur) => {
        return acc + `Name: ${cur.name} || Price: ${cur.price},\n`;
      }, "")}`
      fetch(url)
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error))
      console.log(this.productList)
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
</style>
