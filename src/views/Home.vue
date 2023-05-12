<template>
  <div class="wrap">
  <LeftMenu />
  <PageList />
  </div>
</template>

<script>

import LeftMenu from "./LeftMenu.vue";
import PageList from './PageList.vue'


export default {
  components: { LeftMenu, PageList },
  data() {
    return {
      productList: [],
      page: 1,
      storeList:[]
    };
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
