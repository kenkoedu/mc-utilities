<template>
  <div>
    <QuestionCard v-for="question of questions"
      :key="question.id" :question="question"
      :show-ans="showAns" />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { supabase } from "../db/db.ts";
import { Tables } from "../db/types";
const props = defineProps(['tId', 'classNum', 'isReview', 'showAns'])
const questions = ref<Tables<"mc_questions">[]>([])
const getTopicQuestions = async () => {
  if (props.isReview) {
    const { data } = await supabase
      .from("mc_student_questions")
      .select()
      .match({
        t_id: props.tId,
        class_num: props.classNum
      })
    return data
      ?.filter(a => a.correct)
      .sort((a, b) => b.year * 100 + b.q_num - a.year * 100 - a.q_num) || []
  }
  else {
    const { data } = await supabase
      .from("mc_questions")
      .select()
      .match({
        t_id: props.tId
      })
    return data?.sort((a, b) => a.id - b.id) || []
  }
}

onBeforeMount(async () => {
  questions.value = (await getTopicQuestions())
})
</script>

<style scoped></style>