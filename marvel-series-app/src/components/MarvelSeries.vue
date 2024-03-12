<template>
    <div>
        <h3>THIS IS MARVELSERIES.VUE</h3>
        <div class="series-card">
            <img :src="thumbnail" :alt="title" class="series-image" />
            <div class="series-details">
                <h2 class="series-title">{{ title }}</h2>
                <p class="series-year">Year: {{ year }}</p>
                <p class="series-types">Types: {{ types }}</p>
                <div class="related-resources">
                    <h3>Related Resources</h3>
                    <ul>
                        <li v-for="(resource, index) in relatedResources" :key="index">
                            <a :href="resource.url" target="_blank">{{ resource.name }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <ul>
            <li v-for="serie in series">
                <router-link :to="{ name: 'serie', params: { id: serie.id } }">{{ serie.title }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { public_key, secret_key } from '../marvel';
import axios from 'axios';

export default {
    name: 'MarvelSeries',
    data() {
        return {
            series: []
        }
    },
    mounted() {
        this.getSeries();
    },
    methods: {
        getSeries: function () {
            axios.get(`https://gateway.marvel.com/v1/public/series?apikey=${public_key}`)
                .then((result) => {
                    result.data.data.results.forEach((element) => {
                        this.series.push(element)
                        console.log(element)
                    });
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

}
</script>

<style lang="css">
.series-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
  display: flex;
}

.series-image {
  width: 150px;
  height: auto;
  margin-right: 20px;
}

.series-details {
  flex-grow: 1;
}

.series-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.series-year, .series-types {
  margin-bottom: 5px;
}

.related-resources {
  margin-top: 10px;
}

.related-resources ul {
  padding-left: 20px;
}

.related-resources ul li {
  margin-bottom: 5px;
}

.related-resources a {
  color: #007bff;
  text-decoration: none;
}
</style>