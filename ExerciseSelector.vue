<template>
  <div>
    <!-- ...existing code... -->
    <TopicComponent :title="exerciseTitle">
      <!-- Render question cards here -->
      <QuestionCard v-for="exercise in exercises"
        :key="exercise.id" :exercise="exercise" />
    </TopicComponent>
    <!-- ...existing code... -->
  </div>
</template>

<script>
import TopicComponent from "./components/TopicComponent.vue";
// ...existing code...

export default {
  components: {
    TopicComponent,
    // ...existing components...
  },
  // ...existing code...
};
</script>
