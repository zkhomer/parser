<template>
  <main class="container">
    <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
      <div class="search__block">
        <input type="text" v-model="searchQuery" @input="getSearchResults" placeholder="Search city"
          class="search__input" />
        <button class="button" @click="addCity">Select City</button>
        <ul class="search__list" v-if="mapboxSearchResults">
          <li class="search__text" v-if="searchError">
            Sorry, something went wrong, please try again.
          </li>
          <li class="search__text" v-if="!searchError && mapboxSearchResults.length === 0">
            No results match your query, try a different term.
          </li>
          <template v-else>
            <li class="search__item" v-for="searchResult in mapboxSearchResults" :key="searchResult.id"
              @click="previewCity(searchResult)">
              {{ searchResult.place_name }}
            </li>
          </template>
        </ul>
      </div>
    </BaseModal>
    <div class="cities__list">
      <Suspense>
        <CityList :key="componentKey" />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
    <div class="button" @click="toggleModal">Select City</div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { uid } from "uid";
import { useRouter } from "vue-router";
import CityCardSkeleton from "../components/CityCardSkeleton.vue";
import CityList from "../components/CityList.vue";
import BaseModal from "../components/BaseModal.vue";

const router = useRouter();


const mapboxAPIKey =
  "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";
const searchQuery = ref("");
const searchQueryObj = ref(null)
const savedCities = ref([])
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
      } catch {
        searchError.value = true;
      }

      return;
    }
    mapboxSearchResults.value = null;
  }, 300);
};

const previewCity = (searchResult) => {
  searchQuery.value = searchResult.place_name;
  searchQueryObj.value = searchResult
  mapboxSearchResults.value = null
};

const addCity = () => {
  if (searchQueryObj.value === null) {
    alert('Please enter your query')
    return
  }

  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(
      localStorage.getItem("savedCities")
    );
  }

  if (savedCities.value.length >= 5) {
    alert('you cannot save more than five objects. Delete some of them')
    return
  }

  const locationObj = {
    id: uid(),
    state: searchQueryObj.value.context[0].text,
    city: searchQueryObj.value.text,
    coords: {
      lat: searchQueryObj.value.center[1],
      lng: searchQueryObj.value.center[0],
    },
  };

  savedCities.value.push(locationObj);
  localStorage.setItem(
    "savedCities",
    JSON.stringify(savedCities.value)
  )
  searchQuery.value = ''
  toggleModal()
  forceRerender()
};

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
const componentKey = ref(false);

const forceRerender = () => {
  componentKey.value = !componentKey.value;
};
</script>

<style lang="scss" scoped>
@import '../assets/variables';

.container {
  margin: 0 auto;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;

  @media (min-width: 500px) {
    max-width: $tablet-width;
  }

  @media (min-width: 1200px) {
    max-width: $container;
  }
}

.button {
  display: block;
  margin:30px auto 0 auto;
  padding: 10px 20px;
  border: none;
  border-radius: 12px;
  max-width: fit-content;
  background: linear-gradient(180deg, #957DCD 0%, #523D7F 100%);
  color: #fff;
}

.search__block {
  position: relative;
  width: 100%;
}

.search__input {
  background: #FFFFFF;
  border: 1px solid #ABABCB;
  font-family: $main-font;
  font-weight: 400;
  font-size: 12px;
  color: rgb(0, 0, 0);
  border-radius: 12px;
  padding: 8px 10px;

  &:placeholder {
    font-family: $main-font;
    font-weight: 400;
    font-size: 12px;
    color: #9998B0
  }
}

.search__list {
  position: absolute;
  background-color: #523D7F;
  top: 50%;
  border-radius: 12px;
  list-style: none;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.search__text {
  font-family: $main-font;
  font-weight: 400;
  font-size: 12px;
  color: #fff
}

.search__item {
  font-family: $main-font;
  font-weight: 400;
  font-size: 12px;
  color: #fff
}

.cities__list {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
