<template>
  <div class="home">
    <img alt="Maavel logo" src="../assets/marvel_logo.png">
    <MarvelSeries/>
  </div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import MarvelSeries from '@/components/MarvelSeries.vue'


export default{
  name: 'home',
  components:{
    HelloWorld,
    MarvelSeries
  },
  

}

</script>
