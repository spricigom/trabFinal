<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/stores/genre'; import { useRouter } from 'vue-router'

const router = useRouter()
const genreStore = useGenreStore();
const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;
    await genreStore.getAllGenres('tv');
    isLoading.value = false;
});
const Tvs = ref([]);

const listTvs = async (genreId) => {
    genreStore.setCurrentGenreId(genreId);
    isLoading.value = true;
    const response = await api.get('discover/tv', {
        params: {
            with_genres: genreId,
            language: 'pt-BR'
        }
    });
    Tvs.value = response.data.results
    isLoading.value = false;
};

function openTv(TvId) {
    router.push({ name: 'TvDetails', params: { TvId } });
}
</script>

<template>
    <ul class="genre-list">
        <li v-for="genre in genreStore.genres" :key="genre.id" @click="listTvs(genre.id)" class="genre-item"
            :class="{ active: genre.id === genreStore.currentGenreId }">
            {{ genre.name }}
        </li>
    </ul>
    <loading v-model:active="isLoading" is-full-page />
    <div class="tv-list">
        <div v-for="tv in Tvs" :key="tv.id" class="tv-card">
            <div class="img-tv">
                <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.title" @click="openTv(tv.id)" />
            </div>

            <div class="tv-details">
                <p class="tv-title">{{ tv.original_name }}</p>
            </div>

        </div>
    </div>
</template>

<style scoped>
.genre-item {
    background-color: transparent;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    color: #c5c5c5;
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
    height: 2px;
    background-color: #fff;
    transition: width 0.3s ease-in-out;
}

.genre-item:hover::after {
    width: 100%;
}


.genre-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    padding-left: 15vw;
    padding-right: 15vw;
    text-align: center;
    display: flex;
    flex-direction: row;
    list-style: none;
    margin-top: 2vh;
    margin-bottom: 5vh;
}

.tv-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    display: flex;
    justify-content: space-between;
    padding-left: 7vw;
    padding-right: 7vw;
    text-align: center;
    display: flex;
    flex-direction: row;
}

.tv-card {
    width: 13vw;
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: .2s ease-in-out;
}
.tv-card:hover{
    transform: scale(1.1);
}
.img-tv{
    width: 100%;
    height: 36vh;
}
.img-tv img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 0 1.5rem  rgb(19, 19, 19);
}

.tv-details {
    padding: 0 0.5rem;
}

.tv-title {
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
}

.active {
    color: #fff;
    font-weight: bolder;
}

.movie-genres span.active {
    background-color: #abc322;
    color: #000;
    font-weight: bolder;
}
</style>