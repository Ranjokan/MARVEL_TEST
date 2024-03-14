import { defineStore } from 'pinia'
import axios from 'axios'
import { public_key, limit } from '../marvel'

export const useSeriesStore = defineStore({
    id: 'series',
    state: () => ({
        series: [],
        serieInfo: [],
        total: 0,
        offset: 20,
        loading: false,
        error: false,
    }),
    actions: {
        setLoading(loadingState) {
            this.loading = loadingState;
        },
        setError(errorMessage) {
            this.error = errorMessage;
        },
        async getSeries() {
            try {
                const response = await axios.get(`https://gateway.marvel.com/v1/public/series?limit=${limit}&apikey=${public_key}`)
                this.series = response.data.data.results;

            } catch (error) {
                console.error('Error to get the data', error);
            }
        },
        async loadSeries() {
            try {
                this.setLoading(true);
                const response = await axios.get(`https://gateway.marvel.com/v1/public/series?limit=${limit}&offset=${this.offset}&apikey=${public_key}`)
                this.series = [...this.series, ...response.data.data.results]
                
                this.offset += 20
                this.total -= 20
                
                
            } catch (error) {
                this.setError(error.message);
                console.error('Error to get the data', error);
            }finally{
                this.setLoading(false);  
            }
        },
        async getSeriesById(serieId){
            try{
                const response = await axios.get(`https://gateway.marvel.com/v1/public/series?${serieId}&apikey=${public_key}`)
                this.serieInfo = response.data.data.results;
            }catch (error){
                this.setError(error.message);
                console.error('Error to get the data', error);
            }
        }
    },

})