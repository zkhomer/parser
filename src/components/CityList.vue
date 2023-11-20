<template>
  <Suspense v-if="!loading">
    <div class="card-list__wrapper" v-for="city in displayedCities" :key="city.id">
      <CityCard :city="city" @click="goToCityView(city)" />
      <button class="remove-btn" @click="removeItem(city.id)"></button>
    </div>
    <template #fallback>
      <CityCardSkeleton />
    </template>
  </Suspense>
  <div v-else>
    Loading...
  </div>
</template>

<script setup>
import { useCityListStore } from '@/store/module/sityListStore';
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import CityCard from './CityCard.vue';
import CityCardSkeleton from '../components/CityCardSkeleton.vue';

const cityListStore = useCityListStore();
const router = useRouter();
const loading = ref(true);

onMounted(async () => {
  await cityListStore.getCities();
  loading.value = false;
});

const removeItem = (cityId)=>{
  cityListStore.removeCity(cityId);
}


const goToCityView = (city) => {
  router.push({
    name: 'cityView',
    params: { state: city.state, city: city.city },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};

const displayedCities = computed(() => {
  return cityListStore.savedCities;
});

</script>

<style lang="scss">
.card-list__wrapper{
  position: relative;

}
.remove-btn{
  border-radius: 50%;
  padding:15px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  background-color: #e57878;
  border:none;

  &:after{
    content: "x";
    position: absolute;
    color: #F8F8FF;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>
