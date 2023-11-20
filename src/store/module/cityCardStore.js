// cityCardStore.js
import { defineStore } from 'pinia';

export const useCityCardStore = defineStore({
    id: 'cityCardStore',
    state: () => ({
        timesOfDay: 'is-night',
    }),
    actions: {
        getCurrentTime(city) {
            const localOffset = new Date().getTimezoneOffset() * 60000;
            const utc = city.weather.dt * 1000 + localOffset;
            const currentTime = new Date(utc + 1000 * city.weather.timezone).getHours();

            if (currentTime > 5 && currentTime < 20) {
                this.timesOfDay = 'is-day';
            }
        },

    },
});
