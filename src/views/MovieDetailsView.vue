<script setup>
import { defineProps, onMounted, computed } from 'vue';
import { useMovieStore } from '@/stores/movie';
const movieStore = useMovieStore();

const props = defineProps({
    movieId: {
        type: Number,
        required: true,
    },
});
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

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
        <div class="fundo"></div>

        <div class="content">
            <div class="details">
                <h1>{{ movieStore.currentMovie.title }}</h1>

                <div class="data-e-genero">

                    <p><strong>Data de estreia: </strong>{{ formatDate(movieStore.currentMovie.release_date) }}</p>


                    <p><strong>Avaliação:</strong> {{ movieStore.currentMovie.vote_average }} / 10</p>

                    

                </div>

                <div class="synopsis">
                    <p>{{ movieStore.currentMovie.overview }}</p>
                </div>
                <a href="https://youtu.be/dQw4w9WgXcQ?si=Cma4FgT1sa-3pkUH">
                    <button>
                        <p>Assista</p>
                    </button>
                </a>



                <hr>

                <h2 id="Ficha"><strong>Ficha Técnica</strong></h2>
                <div class="info">
                    <div class="esquerda">
                        <p><strong>Avaliação:</strong> {{ movieStore.currentMovie.vote_average }} / 10</p>

                        <p><strong>Total de avaliações: </strong>{{ movieStore.currentMovie.vote_count }}</p>
                        <p><strong>Popularidade: </strong>{{ movieStore.currentMovie.popularity }}</p>
                        <p><strong>Duração:</strong> {{ movieStore.currentMovie.runtime }}min</p>


                    </div>

                    <div class="direita">
                        <p><strong>Data de lançamento: </strong>{{ formatDate(movieStore.currentMovie.release_date)
                            }}
                        </p>
                        <p><strong>País(es) de Produção:</strong>
                            <span v-for="country in movieStore.currentMovie.production_countries"
                                :key="country.iso_3166_1">
                                {{ country.name }}<span v-if="!$last">, </span>
                            </span>
                        </p>
                        <p> <strong>Gênero: </strong>
                            <span v-for="genre in movieStore.currentMovie.genres" :key="genre.id">
                                {{ genre.name }}<span v-if="!$last">, </span>
                            </span>
                        </p>
                    </div>

                </div>
                <div class="sinopse">
                    <h4>Sinopse</h4>
                    <p>{{ movieStore.currentMovie.overview }}</p>
                </div>






            </div>
        </div>
    </div>
</template>

<style scoped>
.content{
    padding-left: 10vw;
    padding-right: 10vw;
}
.fundo {
    position: absolute;
    z-index: -1;
    height: 100%;
    width: 100%;
    filter: opacity(.6);
    background: rgb(46, 42, 42);
    background: linear-gradient(  rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.76) 78%, rgb(0, 0, 0) 100%);
}

.sinopse {
    width: 25vw;
    margin-bottom: 15vh;

}

.info {
    display: flex;
    flex-direction: row;
    width: 40vw;
    justify-content: space-between;
    margin-bottom: 5vh;
}
.esquerda{
    width: 20vw;
}
.esquerda p{
    font-size: 1vw;
}
.direita p {
    font-size: 1vw;
}

#Ficha {
    margin-top: 3vh;
    font-size: 1.6vw;
    margin-bottom: 5vh;
}

.synopsis {
    width: 60vw;

}

button {
    color: black;
    border: none;
    background-color: white;
    height: 6vh;
    width: 15vw;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.3s, filter .3s
}

button:hover {
    transform: scale(1.05);
    filter: brightness(.9);
}

button p {
    font-size: 1vw;
    font-weight: 600;
}

.synopsis {
    margin-bottom: 2vh;
}

.data-e-genero {
    display: flex;
    margin-top: 6vh;
    margin-bottom: 4vh;
    width: 22vw;
    justify-content: space-between;
    align-items: center;
}

.stars {
    display: flex;
    align-items: center;
    color: gold;
    font-size: 1.2rem;
}

.star {
    color: gold;
}

.half-star {
    color: gold;
}

.empty-star {
    color: lightgray;
}

.content {
    margin-top: 36vh;
    display: flex;
}

.details h1 {
    font-family: 'Quicksand', sans-serif;
    font-size: 2rem;
}

.details {
    width: 100%;
}

hr {
    margin-top: 15vh;
    border: solid rgb(107, 107, 107) 1px;
}

.main {
    position: relative;
    width: auto;
    width: 100%;
    overflow: hidden;
    color: white;
    font-family: Arial, sans-serif;
    /*padding-left: 10vw;
    padding-right: 10vw;*/
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
