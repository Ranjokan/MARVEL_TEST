<template lang="html">
    <div>
        <h3>this is character.vue</h3>
        <p>{{ this.$route.params.id }}</p>

        
        <img :src="url">
    </div>
</template>

<script>
import { public_key, secret_key } from '../marvel';
import axios from 'axios';

export default {
    name: 'Serie',
    data(){
        return{
            serieInfo: [],
            series: [],
            url: '',
            size: 'standard_fantastic.jpg'
        }
    },
    mounted(){
        this.getSerieById();
        
    },
  
    methods: {
        getSerieById: function () {
            var serieId = this.$route.params.id;
            axios.get(`https://gateway.marvel.com/v1/public/series/${serieId}?apikey=${public_key}`)
                .then((result) =>{                  
                    result.data.data.results.forEach((element) => {
                        this.serieInfo.push(element);
                        this.url = `${element.thumbnail.path}/${this.size}`;
                        console.log(element)
                    });
                })
                .catch((error)=> {
                    console.log(error)
                })
        },
        

    }
}
</script>

<style lang="css">
</style>