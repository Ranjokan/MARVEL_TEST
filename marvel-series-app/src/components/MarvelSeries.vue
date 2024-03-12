<template>
    <div>
        <h3>THIS IS MARVELSERIES.VUE</h3>
        <ul>
            <li v-for="serie in series">
                {{ serie.title }}

            </li>
        </ul>
    </div>
</template>

<script>
import { public_key, secret_key } from '../marvel';
import axios from 'axios';

export default {
    name: 'MarvelSeries',
    data(){
        return{
            series: []
        }
    },
    mounted(){
        this.getSeries();
    },
    methods: {
        getSeries: function () {
            axios.get(`https://gateway.marvel.com/v1/public/series?apikey=${public_key}`)
                .then((result) =>{                  
                    result.data.data.results.forEach((element) => {
                        this.series.push(element)
                        console.log(element)
                    });
                })
                .catch((error)=> {
                    console.log(error)
                })
        }
    }

}
</script>

<style lang="css"></style>