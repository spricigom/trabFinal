<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/stores/genre';
import { useRouter } from 'vue-router'

const router = useRouter()
const genreStore = useGenreStore();
const isLoading = ref(false);
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');


onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('movie');
  isLoading.value = false;
});
const movies = ref([]);

const listMovies = async (genreId) => {
  genreStore.setCurrentGenreId(genreId);
  isLoading.value = true;
  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  });
  movies.value = response.data.results;
  isLoading.value = false;
};

function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } });
}
</script>
<template>
  <div class="fundo">
    <ul class="genre-list">
    <li v-for="genre in genreStore.genres" :key="genre.id" @click="listMovies(genre.id)" class="genre-item"
      :class="{ active: genre.id === genreStore.currentGenreId }">
      {{ genre.name }}
    </li>
  </ul>
  <loading v-model:active="isLoading" is-full-page />
  <div class="movie-list">


    <div v-for="movie in movies" :key="movie.id" class="movie-card">
      <div class="img-filme">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"
        @click="openMovie(movie.id)" />
      </div>
      
      <div class="movie-details">
        <p class="movie-title">{{ movie.title }}</p>
        <!--<p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>-->
        
      </div>
    </div>



  </div>
  </div>
  

</template>
<style scoped>

.fundo{
  background-color: #1a1a1a;
}
.genre-item {
  background-color: transparent;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
  text-decoration: none; 
  position: relative;    
  transition: all 0.2s;
  cursor: pointer;
}

.genre-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;           /* Espessura do sublinhado */
  background-color: #fff; /* Cor do sublinhado */
  transition: width 0.3s ease-in-out;
}

.genre-item:hover::after {
  width: 100%;           /* Faz o sublinhado aparecer */
}


.genre-list{
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  padding-left: 15vw;
  padding-right: 15vw;
  text-align: center;
  display: flex;
  flex-direction:row ;
  list-style: none;
  margin-top: 2vh;
  margin-bottom: 5vh;
}
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  display: flex;
  justify-content: space-between;
  padding-left: 7vw;
  padding-right: 7vw;
  text-align: center;
  display: flex;
  flex-direction:row ;
}
.img-filme{
  width: 100%;
  height: 36vh;
}
.movie-card {
  width: 13vw;
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img-filme img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 0 1.5rem  rgb(19, 19, 19);
}

.movie-details {
  padding: 0 0.5rem;
}

.movie-title {
  margin-top: 1.5vh;
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.3rem;
  height: 3.2rem;
  color: rgb(139, 139, 139);
}

.movie-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}

.movie-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.movie-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}

.active {
  background-color: transparent;
  font-weight: bolder;
}

.movie-genres span.active {
  background-color: #abc322;
  color: #000;
  font-weight: bolder;
}
</style>