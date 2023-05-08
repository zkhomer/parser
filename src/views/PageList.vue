<template>
  <div class="page-group">
    <div class="page-group__wrapper">
      <div class="page-group__card-first">+</div>
      <div class="page-group__card">
      </div>
      <div class="page-group__card">
      </div>
      <div class="page-group__card">
      </div>
      <div class="page-group__card">
      </div>
      <div class="page-group__card">
      </div>
      <div class="page-group__card">
      </div>
      <div class="page-group__card">
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({})
</script>

<style lang="scss" scoped>
.page-group {
  &__wrapper{
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
  }
&__card, &__card-first{
  width: 150px;
  height: 150px;
  border: 1px solid black;
}
&__card-first{
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 50px;
  font-weight: bold;
}
}
</style>
