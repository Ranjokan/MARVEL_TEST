import { defineStore } from 'pinia'
import axios from 'axios'
import { public_key, limit } from '../marvel'

export const useSeriesStore = defineStore({
    id: 'series',
    state: () => ({
        series: [],
    }),
    actions: {
        async getSeries() {
            try {
                const response = await axios.get(`https://gateway.marvel.com/v1/public/series?limit=${limit}&apikey=${public_key}`)
                this.series = response.data.data.results;

            } catch (error) {
                console.error('Error to get the data', error);
            }
        }
    },

})