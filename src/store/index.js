import { defineStore } from 'pinia'

export const useStore = defineStore({
    id: 'myStore',
    state: () => ({
        count: 0
    }),
    actions: {
        increment() {
            this.count++
        }
    }
})
