<script setup lang="ts">
// import ByTopic from './pages/ByTopic.vue';
import Navbar from './components/Navbar.vue';
// import ExerciseSelector from './pages/ExerciseSelector.vue';

</script>

<template>
  <Navbar class="no-print"></Navbar>
  <BContainer fluid>
    <RouterView></RouterView>
    <!-- <ExerciseSelector></ExerciseSelector> -->
    <!-- <ByTopic></ByTopic> -->
    <!-- <StudentReport></StudentReport> -->
    <!-- <StudentReport></StudentReport> -->
  </BContainer>
</template>

<style>
@media print {
  .no-print {
    display: none !important;
  }
}
</style>
<style scoped></style>