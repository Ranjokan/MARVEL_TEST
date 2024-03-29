<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
    rel="stylesheet">
  <div class="container mx-auto px-4" style="background-image: url('src/assets/background.jpg');">
    <div class="flex flex-col p-8">
      <p class="title">Marvel Series</p>
    </div>
    <div class="row" v-for="(row, index) in rows" :key="index">
      <div class="column" v-for="(serie, serieIndex) in row" :key="serieIndex">
        <div class="series-card">
          <router-link :to="{ name: 'serie', params: { id: serie.id } }" class="series-title">{{ serie.title
            }}</router-link>
          <div class="series-image">
            <img :src="`${serie.thumbnail.path}/${thumbnailSizeM}`" />
          </div>
          <div class="series-font">
            <p>Start Year:{{ serie.startYear }} - End Year:{{ serie.endYear }}</p>
          </div>
          <div>
            <img v-if="serie.type == 'collection'" src="../assets/icon-collection.png">
            <img v-else-if="serie.type == 'limited'" src="../assets/icon-limited.png">
            <img v-else-if="serie.type == 'one shot'" src="../assets/icon-one-shot.png">
            <img v-else-if="serie.type == 'ongoing'" src="../assets/icon-ongoing.png">
            <img v-else src="../assets/icon-unknown.png">
          </div>
          <div>
            <router-link :to="{ name: 'serie', params: { id: serie.id } }"><button
                class="details-button">Details</button></router-link>
          </div>
        </div>
        <div v-if="loading" class="flex justify-center">
          <loader />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useSeriesStore } from '@/store/series';
import { defineComponent, computed, onMounted, onUnmounted } from 'vue';
import Loader from '../components/Loader.vue'



export default {
  name: 'MarvelSeries',
  data() {
    return {
      isExpanded: false
    };
  },
  mounted() {
    useSeriesStore.offset = 0
  },

  setup() {
    const seriesStore = useSeriesStore();
    const thumbnailSizeM = 'portrait_medium.jpg'
    seriesStore.getSeries();
    const seriesComputed = computed(() => seriesStore.series);

    const loading = seriesStore.loading;
    const error = seriesStore.error;

    console.log(seriesComputed)
    const rows = computed(() => {
      const cardsPerRow = 3;
      return Array.from(
        { length: Math.ceil(seriesComputed.value.length) / cardsPerRow },
        (_, index) => seriesComputed.value.slice(index * cardsPerRow, (index + 1) * cardsPerRow)
      )
    });

    onMounted(() => {
      loadSeries();
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    const loadSeries = () => {
      if (loading.value || error.value) return;

      seriesStore.setLoading(true);
      try {
        seriesStore.loadSeries();
      } catch (err) {
        seriesStore.setError(err.message);
      } finally {
        seriesStore.setLoading(false);
      }
    };

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadSeries();
      }
    };

    return {
      rows,
      thumbnailSizeM,
      loading,
      error
    }

  },
  methods: {

  },
  components: {
    Loader
  }

}
</script>

<style lang="css">
.row {
  display: flex;
  margin: 0 -10px;
}

.column {
  flex: 33.33%;
  padding: 0 10px;
}

.title {
  margin-bottom: 1.5rem;
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: #02030C;
}

.series-font {
  font-family: "Comic Neue", cursive;
  font-weight: 700;
  font-style: normal;
  color: #f8b007;
}

.series-card {
  border: 3px solid #f8b007;
  border-radius: 8px;
  background-color: #02030C;
  padding: 20px;
  margin: 10px;
  color: #FCD883;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  position: relative;
  flex: 1;
  flex-direction: column;
}

.series-image {
  padding-top: 20px;
}

.series-details {
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.series-title {
  font-size: 1.2rem;
  margin-bottom: 20px;
  font-family: "Comic Neue", cursive;
  font-weight: 700;
  font-style: normal;
  color: #f8b007;
}

.expanded {
  max-height: initial;
  white-space: normal;
}

.details-button {
  bottom: 10px;
  right: 10px;
  background-color: #02030C;
  color: #ffd900;
  border: 3px solid #ffd900;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  margin-top: 20px;
  font-family: 'Comic Neue';
  font-weight: 900;
}

.details-button:hover {
  background-color: #f75a0a;
  color: #02030C;
  border: 3px solid #02030C;
}
</style>