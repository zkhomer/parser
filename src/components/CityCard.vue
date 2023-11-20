<template>
  <div class="city__container " :class="{ 'day': timesofDay === 'is-day', 'night': timesofDay === 'is-night' }">
    <div class="city__info">
      <h2 class="city__info-name">{{ city.city }}</h2>
      <h3 class="city__info-state">{{ city.state }}</h3>
    </div>

    <div class="temp">
      <p class="main__temp">
        {{ Math.round(city.weather.main.temp) }}&deg;C
      </p>
      <div class="temp-block">
        <span class="secondary__temp">
          H:
          {{ Math.round(city.weather.main.temp_max) }}&deg;C
        </span>
        <span class="secondary__temp">
          L:
          {{ Math.round(city.weather.main.temp_min) }}&deg;C
        </span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useCityCardStore } from '@/store/module/cityCardStore';
import {onMounted} from "vue";

const props = defineProps({
  city: {
    type: Object,
    default: () => ({}),
  },
});

const cityCardStore = useCityCardStore();

onMounted(() => {
  cityCardStore.getCurrentTime(props.city);
});

</script>

<style lang="scss" scoped>
@import '../assets/variables';

.city__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.10);
}

.city__info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
}

.city__info-name {
  font-family: $main-font;
  font-weight: 600;
  font-size: 30px;
  color: rgb(0, 0, 0);

  @media (min-width: 600px) {
    font-size: 50px
  }
}

.city__info-state {
  font-family: $main-font;
  font-weight: 400;
  font-size: 15px;
  color: rgb(0, 0, 0);

  @media (min-width: 600px) {
    font-size: 25px
  }
}


.day {
  height: 100px;
  background-size: 100%;

  @media (min-width: 600px) {
    height: 200px;
  }
}

.night {
  height: 100px;
  background-size: 100%;

  @media (min-width: 600px) {
    height: 200px;
  }

  & .city__info-name {
    color: #fff
  }

  & .city__info-state {
    color: #fff
  }

  & .main__temp {
    color: #fff
  }

  & .secondary__temp {
    color: #fff
  }
}

.temp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.main__temp {
  font-family: $main-font;
  font-weight: 600;
  font-size: 30px;
  color: rgb(0, 0, 0);

  @media (min-width: 600px) {
    font-size: 50px
  }
}

.secondary__temp {
  font-family: $main-font;
  font-weight: 400;
  font-size: 15px;
  color: rgb(0, 0, 0);

  @media (min-width: 600px) {
    font-size: 25px
  }
}
</style>
