import { defineStore } from 'pinia'
import axios from 'axios'

export const useStore = defineStore({
    id: 'parserStore',
    state: () => ({

    }),
    actions: {
        async fetchUserData() {
            try {
                const userData = localStorage.getItem('user-data');
                if (!userData) {
                    console.error('User data not found in local storage');
                    return null;
                }
                const { login, password } = JSON.parse(userData);
                const response = await axios.post('http://ec2-16-170-86-192.eu-north-1.compute.amazonaws.com/user-login', {
                    login,
                    password
                });
                console.log('User login response:', response.data);
                return response.data; // возвращает данные из ответа
            } catch (error) {
                console.error('Error fetching user data:', error);
                return null;
            }
        }
    }
})
