<template lang="html">
    <div class="dark-mode">
        <div v-for="item in serieInfo">
            <div class="series-details">
                <div class="left-column series-image">
                    <img :src="url">
                </div>
                <div>
                    <h2>{{ item.title }}</h2>
                    <p class="year">Start Year: {{ item.startYear }} - End Year: {{ item.endYear }}</p>
                    <p class="type">Type: {{ item.type }}</p>
                    <img v-if="item.type == 'collection'" src="../assets/icon-collection.png">
                    <img v-else-if="item.type == 'limited'" src="../assets/icon-limited.png">
                    <img v-else-if="item.type == 'one shot'" src="../assets/icon-one-shot.png">
                    <img v-else-if="item.type == 'ongoing'" src="../assets/icon-ongoing.png">
                    <img v-else src="../assets/icon-unknown.png">
                    <p class="description">{{ item.description || "Description not available." }}</p>
                    <div v-if="item.stories.available > 0" class="references">
                        <h3>Stories: {{ item.stories.available }}</h3>
                        <p v-for="names in item.stories.items" :key="nameIndex"
                            @click="getStoryDescription(names.resourceURI)">{{ names.name }}</p>
                        <div v-for="story in storyInfo" class="details-card">
                            <p>Story Id: {{ story.id }}</p>
                            <p v-if="story.description === ''" style="font-size: small;">No resources were found.</p>
                            <p v-else style="font-size: small;">{{ story.description }}</p>
                        </div>

                    </div>
                    <div v-if="item.comics.available > 0" class="references">
                        <h3>Comics: {{ item.comics.available }}</h3>
                        <p v-for="names in item.comics.items" :key="nameIndex"
                            @click="getComicDescription(names.resourceURI)">{{ names.name }}</p>
                        <div v-for="comic in comicInfo" class="details-card">
                            <p>Comic Id: {{ comic.id }}</p>
                            <p v-if="comic.description === ''" style="font-size: small;">No resources were found.</p>
                            <p v-else style="font-size: small;">{{ comic.description }}</p>
                        </div>

                    </div>
                </div>
            </div>






        </div>

    </div>

</template>

<script>
import { public_key } from '../marvel';
import axios from 'axios';

export default {
    name: 'Serie',
    data() {
        return {
            serieInfo: [],
            series: [],
            storyInfo: [],
            comicInfo: [],
            url: '',
            size: 'standard_fantastic.jpg'
        }
    },
    mounted() {
        this.getSerieById();
        console.log(this.serieInfo)
    },

    methods: {
        getSerieById: function () {
            var serieId = this.$route.params.id;
            axios.get(`https://gateway.marvel.com/v1/public/series/${serieId}?apikey=${public_key}`)
                .then((result) => {
                    result.data.data.results.forEach((element) => {
                        this.serieInfo.push(element);
                        this.url = `${element.thumbnail.path}/${this.size}`;
                    });
                })
                .catch((error) => {
                    console.log(error)
                });

        },
        getStoryDescription: function (storyUrl) {
            this.storyInfo.pop();
            axios.get(`${storyUrl}?apikey=${public_key}`)
                .then((result) => {
                    result.data.data.results.forEach((element) => {
                        this.storyInfo.push(element);
                    });
                })
                .catch((error) => {
                    console.log(error)
                });
           
        },
        getComicDescription: function (comicUrl) {
            this.comicInfo.pop();
            axios.get(`${comicUrl}?apikey=${public_key}`)
                .then((result) => {
                    result.data.data.results.forEach((element) => {
                        this.comicInfo.push(element);
                    });
                })
                .catch((error) => {
                    console.log(error)
                });
          

        },

    }
}
</script>

<style lang="css">
.dark-mode {
    background-color: #333;
    color: #fff;
}

.series-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
    margin: 20px;
}

.left-column {
    justify-content: center;
    align-items: center;
}

.series-image {
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}


h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

.year,
.type {
    font-size: 18px;
    margin-bottom: 5px;
    color: #ffd900
}

.description {
    font-size: small;
    margin-bottom: 20px;
}

.references {
    margin-top: 20px;
}

.references h3 {
    font-size: 20px;
    margin-bottom: 10px;
}

.details-card {
    border: 3px solid #f8b007;
    border-radius: 8px;
}
</style>