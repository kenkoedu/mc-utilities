<template>
  <BContainer v-if="topics.length"
    v-for="(questionsByTopic, t_id) in questionsByTopics"
    :key="t_id" style="page-break-after: always;">
    <h5>{{ t_id }}. {{ getTopicName(t_id) }}</h5>
    <QuestionCard v-for="(question, i) of questionsByTopic"
      :key="i" :question="question" :show-ans="true">
    </QuestionCard>
  </BContainer>
</template>

<script setup lang="ts">
import { supabase, getTopics } from '../db/db';
import { Tables } from '../db/types';
import { groupBy } from "../lib/groupBy"
import { onBeforeMount, ref, computed } from 'vue';

const questions = ref<Tables<"mc_questions">[]>([])
const topics = ref<Tables<"mc_topics">[]>([])
const questionsByTopics = computed(() => questions.value.length ? groupBy(questions.value, "t_id") : [])

const getQuestions = async (): Promise<Tables<'mc_questions'>[]> => {
  const { data } = await supabase.from('mc_questions').select()
  return data?.sort((a, b) => a.id - b.id) || []
}

const getTopicName = (t_id: number) => topics.value.find(t => t.id == t_id)?.t_title || null

onBeforeMount(async () => {
  questions.value = await getQuestions()
  topics.value = await getTopics()
})
</script>

<style scoped></style>