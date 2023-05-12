<template>
  <div class="page-group">
    <div class="page-group__wrapper">
      <div class="page-group__card-first">+</div>
      <div @click="()=>selectCategoryPageHandler(store)" class="page-group__card" v-for="store of pagesCategories.pages">
        {{ store.categoryName }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '../store';
import {storeToRefs} from 'pinia'
import {onMounted, computed} from 'vue';
import {useRouter} from 'vue-router/dist/vue-router';

const router = useRouter();

const parserStore = useStore();
const { currentTargetStore } = storeToRefs(parserStore);

const pagesCategories = computed(() => currentTargetStore.value)

onMounted(()=>{})

const selectCategoryPageHandler = (pageCategory) =>{
  parserStore.setSelectedCategory(pageCategory)
  router.push({ name: 'category-info' });

}

</script>

<style lang="scss" scoped>
.page-group {
  &__wrapper{
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
  }
&__card, &__card-first{
  width: 150px;
  height: 150px;
  border: 1px solid black;
}
&__card-first{
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 50px;
  font-weight: bold;
}
}
</style>
