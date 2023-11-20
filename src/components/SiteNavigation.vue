<template>
  <header class="header">
    <nav class="navigation">
      <RouterLink :to="{ name: 'home' }">
        <div class="logo">
          <span class="logo__text">Weather-app</span>
        </div>
      </RouterLink>

      <div class="icons__thumb">
        <RouterLink :to="{ name: 'favorites' }">
          <div class="navigation__icon" @click="toggleModal">
            <svg class="icon-heart" height="19" width="19">
              <use href="../assets/symbol-defs.svg#icon-heart"></use>
            </svg>
          </div>
        </RouterLink>

      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";

import { onMounted, ref } from "vue";
import BaseModal from "./BaseModal.vue";
import FavoritesView from "../views/FavoritesView.vue";


const route = useRoute();
const router = useRouter();

</script>

<style lang="scss" scoped>
@import '../assets/variables';

.header {
  position: sticky;
  top: 0;
  width: 100%;
  border-bottom: 1px solid #dadada;
  background-color: #F8F8FF;
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  padding: 30px;

  @media (min-width: 500px) {
    max-width: $tablet-width;
  }

  @media (min-width: 1200px) {
    max-width: $container;
  }
}

.logo__text {
  font-family: $main-font;
  font-weight: 600;
  font-size: 18px;
  color: #28b460;

  @media (min-width: 600px) {
    font-size: 28px;
  }
}

.navigation__icon {
  border-radius: 50%;
  padding: 10px;
  width: 40px;
  height: 40px;
  background: #f3a8a8;
  cursor: pointer;

  &:hover {
    background-color: #7284FF;
  }
}

.icon-heart {
  fill: transparent;
}

.icons__thumb {
  display: flex;
  gap: 15px;
}
</style>