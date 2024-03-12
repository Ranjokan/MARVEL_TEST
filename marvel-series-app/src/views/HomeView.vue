<template>
  <div class="home">
    <img alt="Maavel logo" src="../assets/marvel_logo.png">
    <MarvelSeries/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import MarvelSeries from '@/components/MarvelSeries.vue'

@Options({
  components: {
    HelloWorld,
    MarvelSeries
  },
})
export default class HomeView extends Vue {}
</script>
