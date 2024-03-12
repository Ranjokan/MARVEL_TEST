<template>
  <div>
    <h3>THIS IS MARVELSERIES.VUE</h3>
    <div class="row" v-for="(row, index) in rows" :key="index">
      <div class="column" v-for="(serie, serieIndex) in row" :key="serieIndex">
        <div class="series-card">

          <router-link :to="{ name: 'serie', params: { id: serie.id } }">{{ serie.title }}</router-link>

        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { useSeriesStore } from '@/store/series';
import { defineComponent, computed } from 'vue';

export default {
  name: 'MarvelSeries',

  mounted() {

    console.log(this.series)
  },
  setup() {
    const seriesStore = useSeriesStore();
    seriesStore.getSeries();
    const seriesComputed = computed(() => seriesStore.series);

    const rows = computed(() => {
      const cardsPerRow = 3;
      return Array.from(
        { length: Math.ceil(seriesComputed.value.length) / cardsPerRow },
        (_, index) => seriesComputed.value.slice(index * cardsPerRow, (index + 1) * cardsPerRow )
      )
    })

    return {
      rows
    }

  },
  methods: {

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

.series-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
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

.series-year,
.series-types {
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