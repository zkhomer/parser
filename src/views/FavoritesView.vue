<template>
    <div class="container">
        <h1 class="favorites__title">Favorites List</h1>
        <div class="cities__list">
            <Suspense>
                <FavoritesList />
                <template #fallback>
                    <CityCardSkeleton />
                </template>
            </Suspense>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import FavoritesList from "../components/FavoritesList.vue";


const router = useRouter();

</script>

<style lang="scss" scoped>
@import '../assets/variables';

.container {
    margin: 0 auto;
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;

    @media (min-width: 500px) {
        max-width: $tablet-width;
    }

    @media (min-width: 1200px) {
        max-width: $container;
    }
}

.cities__list {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 30px;
    margin-bottom: 30px;
}

.favorites__title {
    font-family: $main-font;
    font-weight: 600;
    font-size: 18px;
    color: #7284FF;
    text-align: center;
    width: 100%;
    margin-top: 30px;

    @media (min-width: 600px) {
        font-size: 28px;
    }

}
</style>