<script setup>
import { defineProps, onMounted } from 'vue';
import { useTvStore } from '@/stores/tv';
const TvStore = useTvStore();

const props = defineProps({
    TvId: {
        type: Number,
        required: true,
    },
});

onMounted(async () => {
    await TvStore.getTvDetail(props.TvId);
});
</script>

<template>

    <div class="main">
        <div class="content">
            <img :src="`https://image.tmdb.org/t/p/w185${TvStore.currentTv.poster_path}`"
                :alt="TvStore.currentTv.title" />

            <div class="details">
                <h1>Filme: {{ TvStore.currentTv.title }}</h1>
                <p>{{ TvStore.currentTv.tagline }}</p>
                <p>{{ TvStore.currentTv.overview }}</p>
                <p>Orçamento: ${{ TvStore.currentTv.budget }}</p>
                <p>Avaliação: {{ TvStore.currentTv.vote_average }}</p>
            </div>
        </div>
    </div>

    <p>Produtoras</p>
    <div class="companies">
        <template v-for="company in TvStore.currentTv.production_companies" :key="company.id">
            <img v-if="company.logo_path" :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
                :alt="company.name" />
            <p v-else>{{ company.name }}</p>
        </template>
    </div>

</template>

<style scoped>
.companies {
    display: flex;
    flex-direction: row;
    column-gap: 3rem;
    align-items: center;
    margin-bottom: 2rem;
}
</style>