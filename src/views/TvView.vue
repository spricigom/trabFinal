<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';

const isLoading = ref(false); 
const genres = ref([]);

onMounted(async () => {
    const response = await api.get('genre/tv/list?language=pt-BR');
    genres.value = response.data.genres;
});
const Tvs = ref([]);

const listTvs = async (genreId) => {
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
</script>

<template>
    <h1>Programas de TV</h1>
    <ul class="genre-list">
        <li v-for="genre in genres" :key="genre.id" @click="listTvs(genre.id)" class="genre-item">
            {{ genre.name }}
        </li>
    </ul>
    <loading v-model:active="isLoading" is-full-page />
    <div class="tv-list">
        <div v-for="tv in Tvs" :key="tv.id" class="tv-card">

            <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.name" />
            <div class="tv-details">
                <p class="tv-title">{{ tv.original_name }}</p>
                <p class="tv-release-date">{{ tv.first_air_date }}</p>
                <p class="tv-genres">{{ tv.genre_ids }}</p>
            </div>

        </div>
    </div>
</template>

<style scoped>
.genre-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    list-style: none;
    padding: 0;
}

.genre-item {
    background-color: #5d6424;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    align-self: center;
    color: #fff;
    display: flex;
    justify-content: center;
}

.genre-item:hover {
    cursor: pointer;
    background-color: #7d8a2e;
    box-shadow: 0 0 0.5rem #5d6424;
}

.tv-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.tv-card {
    width: 15rem;
    height: 30rem;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 0 0.5rem #000;
}

.tv-card img {
    width: 100%;
    height: 20rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem #000;
}

.tv-details {
    padding: 0 0.5rem;
}

.tv-title {
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 1.3rem;
    height: 3.2rem;
}
</style>