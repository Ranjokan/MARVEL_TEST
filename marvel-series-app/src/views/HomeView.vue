<template>
  <div class="container">
    <img alt="Maavel logo" src="../assets/marvel_logo.png">
  </div>
  <div>
    <MarvelSeries />
  </div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import MarvelSeries from '@/components/MarvelSeries.vue';


export default {
  name: 'home',
  components: {
    HelloWorld,
    MarvelSeries
  },


}

</script>

<style lang="css">
.container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.container img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
}
</style>
