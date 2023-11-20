<template>
  <div class="container">
    <Suspense>
      <template #default>
        <CityViewComponent />
      </template>
      <template #fallback>
        <CityViewSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import CityViewSkeleton from "../components/CityViewSkeleton.vue";
import CityViewComponent from "@/components/CityViewComponent.vue";
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
</style>
