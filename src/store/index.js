import { defineStore } from 'pinia'
import axios from 'axios'

export const useStore = defineStore({
    id: 'parserStore',
    state: () => ({
        currentTargetStore: {},
        selectedCategory:{}
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
                const response = await axios.post('http://localhost:3000/user-login', {
                    login,
                    password
                });
                return response.data;
            } catch (error) {
                console.error('Error fetching user data:', error);
                return null;
            }
        },
        setCurrentStore(currentStoreData) {
            this.currentTargetStore = currentStoreData;
        },
        setSelectedCategory(selectedCategory){
            this.selectedCategory = selectedCategory
        }

    },
    getters:{
        getCurrentStore(){
           return state.currentTargetStore
        }
    }
})
