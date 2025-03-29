<template>
  <div>
    <!-- ...existing code... -->
    <TopicComponent :title="topicTitle">
      <!-- Render question cards here -->
      <QuestionCard v-for="question in questions"
        :key="question.id" :question="question" />
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
