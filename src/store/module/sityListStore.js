// cityListStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { uid } from 'uid';

export const useCityListStore = defineStore({
    id: 'cityListStore',
    state: () => ({
        savedCities: [],
    }),
    actions: {
        async getCities() {
            if (localStorage.getItem('savedCities')) {
                this.savedCities = JSON.parse(localStorage.getItem('savedCities'));
                await this.fetchWeatherData();
            } else {
                await this.getCurrentLocation();
            }
        },
        async getCurrentLocation() {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=f6502ee2d4e83d4caa8e4ec0bf287830&units=metric`);

                const locationObj = {
                    id: uid(),
                    state: weatherData.data.sys.country,
                    city: weatherData.data.name,
                    coords: {
                        lat: weatherData.data.coord.lat,
                        lng: weatherData.data.coord.lon,
                    },
                    weather: weatherData.data,
                };

                this.savedCities.push(locationObj);
                localStorage.setItem('savedCities', JSON.stringify(this.savedCities));
                await this.fetchWeatherData();
            } catch (error) {
                console.error('Error getting current location:', error);
            }
        },
        async fetchWeatherData() {
            const requests = this.savedCities.map(city => axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=f6502ee2d4e83d4caa8e4ec0bf287830&units=metric`));
            const weatherData = await Promise.all(requests);

            weatherData.forEach((value, index) => {
                this.savedCities[index].weather = value.data;
            });

            localStorage.setItem('savedCities', JSON.stringify(this.savedCities));
        },
        async addCity(locationObj) {
            this.savedCities.push(locationObj);
            await this.fetchWeatherData();
        },
        removeCity(id) {
            const index = this.savedCities.findIndex(city => city.id === id);
            if (index !== -1) {
                this.savedCities.splice(index, 1);
                localStorage.setItem('savedCities', JSON.stringify(this.savedCities));
            }
        },
    },
});
