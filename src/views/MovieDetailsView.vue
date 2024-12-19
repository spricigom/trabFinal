<script setup>
import { defineProps, onMounted } from 'vue';
import { useMovieStore } from '@/stores/movie';
const movieStore = useMovieStore();

const props = defineProps({
    movieId: {
        type: Number,
        required: true,
    },
});

onMounted(async () => {
    await movieStore.getMovieDetail(props.movieId);
});




</script>

<template>
    <div class="main">
        <div class="gradiente"></div>
        <div class="background">
            <img :src="`https://image.tmdb.org/t/p/original${movieStore.currentMovie.backdrop_path}`"
                :alt="movieStore.currentMovie.title" />
        </div>

        <div class="content">
            <div class="details">
                <h1>{{ movieStore.currentMovie.title }}</h1>
                <div class="data-e-genero">
                    <p>{{ movieStore.currentMovie.release_date }}</p>
                    <p>
                        <span v-for="genre in movieStore.currentMovie.genres" :key="genre.id">
                            {{ genre.name }}<span v-if="!$last">, </span>
                        </span>
                    </p>
                    <p><strong>Classificação:</strong> {{ movieStore.currentMovie.certification || 'N/A' }}</p>

                </div>


                <div class="synopsis">
                    <h2></h2>
                    <p>{{ movieStore.currentMovie.overview }}</p>
                </div>

                <p><strong>Duração:</strong> {{ movieStore.currentMovie.runtime }} minutos</p>
                <p><strong>Receita:</strong> ${{ movieStore.currentMoSinopsevie.revenue }}</p>
                <p><strong>País(es) de Produção:</strong>
                    <span v-for="country in movieStore.currentMovie.production_countries" :key="country.iso_3166_1">
                        {{ country.name }}<span v-if="!$last">, </span>
                    </span>
                </p>
                <p><strong>Classificação:</strong> {{ movieStore.currentMovie.certification || 'N/A' }}</p>








                <!-- 
                <p class="tagline">{{ movieStore.currentMovie.tagline }}</p>
                <p class="overview">{{ movieStore.currentMovie.overview }}</p>
                <p><strong>Orçamento:</strong> ${{ movieStore.currentMovie.budget }}</p>
                <p><strong>Avaliação:</strong> {{ movieStore.currentMovie.vote_average }}</p>
                -->
            </div>
        </div>
    </div>
</template>

<style scoped>
.synopsis{
    margin-bottom: 5vh;
}
.data-e-genero{
    display: flex;
    margin-top: 4vh;
    margin-bottom: 8vh;
    width: 20vw;
    justify-content: space-around;
}
.content {
    margin-top: 25vh;
    display: flex;
    width: 40vw;
}

.details h1 {
    font-family: 'Quicksand', sans-serif;
    font-size: 2.3em;
}

.main {
    position: relative;
    width: auto;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    color: white;
    font-family: Arial, sans-serif;
    padding-left: 10vw;
}

.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    overflow: hidden;
    display: flex;
}

.background img {
    width: 100%;
    object-fit: cover;
    filter: brightness(.6);
}

.gradiente {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(0, 0, 0);
    background: linear-gradient(90deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.76) 18%, rgba(0, 0, 0, 0) 60%, rgba(0, 212, 255, 0) 100%);
    z-index: -1;
}
</style>