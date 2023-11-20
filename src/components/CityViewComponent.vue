<template>
  <div class="weather__container">
    <div class="">
      <div class="banner__block" v-if="isCity">
        <p class="banner-text">
          Click the "+" icon to add this city for favorites.
        </p>
        <div @click="addCity" class="banner__icon" v-if="route.path !== '/' && route.path !== '/favorites'">
          <svg class="icon-plus" height="19" width="19">
            <use href="../assets/symbol-defs.svg#icon-plus"></use>
          </svg>
        </div>
      </div>
      <div class="banner__block" v-else>
        <p class="banner-text">
          This city in you favorites
        </p>
      </div>

    </div>
    <div class="weather__today">
      <h1 class="weather__today-title">{{ route.params.city }}</h1>
      <p class="weather__today-text">
        {{
          new Date(weatherData.currentTime).toLocaleDateString(
              "en-us",
              {
                weekday: "short",
                day: "2-digit",
                month: "long",
              }
          )
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString(
              "en-us",
              {
                timeStyle: "short",
              }
          )
        }}
      </p>
      <p class="weather__today-text">
        {{ Math.round(weatherData.current.temp) }}&deg;C
      </p>
      <p class="weather__today-text">
        Feels like
        {{ Math.round(weatherData.current.feels_like) }} &deg;C
      </p>
      <p class="weather__today-text">
        {{ weatherData.current.weather[0].description }}
      </p>
      <img class="weather__today-icon" :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
        " alt=""/>
    </div>

    <div class="chart__container">
      <div class="buttons__thumb">
        <h2 class="button" :class="{ 'active': toggle }" @click="tempToday">Today Temp</h2>
        <h2 class="button" :class="{ 'active': !toggle }" @click="tempWeek">5 Day Temp</h2>
      </div>
      <div class="chart">
        <canvas id="myChart"></canvas>
      </div>
    </div>

    <div class="weekly__weather" v-if="!toggle">
      <div class="weekly__weather-block">
        <h2 class="weekly__weather-title">5 Day Forecast</h2>
        <div class="weekly__weather-item" v-for="day in weatherData.daily.slice(1, 6)" :key="day.dt">
          <p class="weekly__weather-text">
            {{
              new Date(day.dt * 1000).toLocaleDateString(
                  "en-us",
                  {
                    weekday: "long",
                  }
              )
            }}
          </p>
          <img class="weekly__weather-img" :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
              " alt=""/>
          <div class="weekly__weather-thumb">
            <p>H: {{ Math.round(day.temp.max) }}</p>
            <p>L: {{ Math.round(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="button remove-block" @click="toggleModal">Remove City</div>
    <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
      <div class="remove-block">
        <p class="remove-text">Are you sure you want to delete the city?</p>
        <div class="button remove-button" @click="removeCity">
          Remove City
        </div>
      </div>
    </BaseModal>

  </div>
</template>

<script setup>
import {uid} from "uid";
import axios from "axios";
import {useRoute, useRouter} from "vue-router";
import Chart from 'chart.js/auto';
import {ref, onMounted} from 'vue'
import BaseModal from "./BaseModal.vue";

const route = useRoute();
let chart

const isCity = ref(true)
const favoritesCities = ref([])
const isFavoritesCity = () => {
  if (localStorage.getItem("favoritesCities")) {
    favoritesCities.value = JSON.parse(
        localStorage.getItem("favoritesCities")
    );
  }
  favoritesCities.value.forEach((city) => {
    if (city.city == route.params.city)
      isCity.value = false
  })
  return isCity.value
}

isFavoritesCity()

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric`
    );

    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;

    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime =
          utc + 1000 * weatherData.data.timezone_offset;
    });
    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();

let toggle = ref(true);

const tempToday = () => {
  if (toggle.value) {
    return
  } else {
    chart.destroy()
    toggle.value = !toggle.value
    weatherChart();
  }
}
const tempWeek = () => {
  if (!toggle.value) {
    return
  } else {
    chart.destroy()
    toggle.value = !toggle.value

    weatherChart();
  }
}

const weatherChart = () => {

  const ctx = document.getElementById('myChart');

  if (toggle.value) {
    const hourlyfilteredList = weatherData.hourly.slice(1, 25)
    const time = []
    const temp = []
    hourlyfilteredList.forEach((hour) => {
      time.push(new Date(hour.dt * 1000).toLocaleString("en-us", {hour: "numeric"}))
      temp.push(hour.temp)
    })

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: time,
        datasets: [{
          label: 'Current Temp',
          data: temp,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  if (!toggle.value) {
    const dailyfilteredList = weatherData.daily.slice(1, 6)
    const time = []
    const temp = []
    dailyfilteredList.forEach((day) => {
      time.push(new Date(day.dt * 1000).toLocaleString("en-us", {weekday: "long"}))
      temp.push((day.temp.max + day.temp.min) / 2)
    })

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: time,
        datasets: [{
          label: 'Daily Temp',
          data: temp,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }
}

const router = useRouter();
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter(
      (city) => city.id !== route.query.id
  );
  localStorage.setItem(
      "savedCities",
      JSON.stringify(updatedCities)
  );
  router.push({
    name: "home",
  });

  if (localStorage.getItem("favoritesCities")) {
    const favCities = JSON.parse(localStorage.getItem("favoritesCities"));
    const updatedFavCities = favCities.filter(
        (city) => city.id !== route.query.id
    );
    localStorage.setItem(
        "favoritesCities",
        JSON.stringify(updatedFavCities)
    );
    router.push({
      name: "home",
    });
  }
};
onMounted(() => {
  weatherChart()
})

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
const addCity = () => {
  if (localStorage.getItem("favoritesCities")) {
    favoritesCities.value = JSON.parse(
        localStorage.getItem("favoritesCities")
    );
  }

  if (favoritesCities.value.length >= 5) {
    alert('you cannot save more than five objects. Delete some of them')
    return
  }

  if (favoritesCities.value !== 0) {
    const city = favoritesCities.value.some((city) => {
      console.log(city.city)
      console.log(route.params.city)
      return city.city == route.params.city
    })
    if (city) {
      alert('This city is already in the favorites')
      return
    }
  }


  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  favoritesCities.value.push(locationObj);
  localStorage.setItem(
      "favoritesCities",
      JSON.stringify(favoritesCities.value)
  );

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({query});
  isFavoritesCity()
};

</script>

<style lang="scss" scoped>
@import '../assets/variables';

.weather__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather__today {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  margin-top: 30px;
  width: 100%;
  background: linear-gradient(180deg, #957DCD 0%, #523D7F 100%);
  padding: 30px 50px;
  border-radius: 12px;

  &-title {
    font-family: $main-font;
    font-weight: 600;
    font-size: 50px;
    color: #fff
  }

  &-text {
    font-family: $main-font;
    font-weight: 400;
    font-size: 25px;
    color: #fff
  }
}


.chart__container {
  margin-top: 70px;
  width: 100%;
}

.buttons__thumb {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
}

.button {
  display: block;
  margin: 30px auto 0 auto;
  padding: 10px 20px;
  border: 0;
  border-radius: 12px;
  max-width: fit-content;
  background: #d97c7c;
  color: #fff;
  font-family: $main-font;
  font-weight: 400;
  font-size: 15px;
  cursor: pointer;
}

.chart {
  width: 100%;
  overflow-y: scroll;
}

#myChart {
  overflow-y: scroll;
}

.weekly__weather {
  margin-top: 70px;
  width: 100%;
}

.weekly__weather-block {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;

}

.weekly__weather-title {

  font-family: $main-font;
  font-weight: 600;
  font-size: 28px;
  color: #7284FF;
  text-align: center;
  width: 100%;
}

.weekly__weather-item {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  border: 1px solid #dadada;
  padding: 15px 10px;
  border-radius: 12px;
  background: linear-gradient(180deg, #957DCD 0%, #523D7F 100%);
}

.weekly__weather-text {
  font-family: $main-font;
  font-weight: 400;
  font-size: 15px;
  color: #fff
}

.weekly__weather-thumb {
  display: flex;
  justify-content: space-between;
  gap: 20px;

  & p {
    font-family: $main-font;
    font-weight: 400;
    font-size: 10px;
    color: #fff
  }
}

.remove-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.remove-text {
  font-family: $main-font;
  font-weight: 600;
  font-size: 15px;
  color: rgb(0, 0, 0);
  text-transform: uppercase;
}

.remove-block.button {
  margin-top: 30px;
  margin-bottom: 30px;
  background: red;
}

.button.remove-button {
  background: red;
}

.button.active {
  background: green;
}

.banner-text {
  font-family: $main-font;
  font-weight: 600;
  font-size: 15px;
  color: #7284FF;
  text-align: center;
  width: 100%;
}

.banner__block {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.banner__icon {
  border-radius: 50%;
  padding: 10px;
  width: 40px;
  height: 40px;
  background: #D7D8F0;
  cursor: pointer;

  &:hover {
    background-color: #7284FF;
  }
}
</style>
