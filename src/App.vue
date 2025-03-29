<script setup lang="ts">
// import ByTopic from './pages/ByTopic.vue';
import Navbar from './components/Navbar.vue';
// import ExerciseSelector from './pages/ExerciseSelector.vue';

</script>

<template>
  <Navbar class="no-print"></Navbar>
  <BContainer fluid class="main-container">
    <RouterView></RouterView>
  </BContainer>
</template>

<style>
@media print {
  .no-print {
    display: none !important;
  }
}

.main-container {
  max-width: 1440px;
  margin: 0 auto;
}

@media (max-width: 1440px) {
  .main-container {
    max-width: 100%;
    padding: 0 1rem;
  }
}
</style>
<style scoped></style>