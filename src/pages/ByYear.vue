<template>
  <h2>{{ settings.lang == "e" ? "All questions (BY YEAR)"
    :
    "按年份" }}</h2>
  <div :key="settings.lang + sortMethod">
    <div v-for="(year, i) of years" :key="i">
      <TopicQuestions :t-id="null" :is-review="false"
        :show-ans="false" :key="years.length"
        :sort-method="sortMethod" :topic-title="year"
        :collapsed="true" :year="year" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useSettingsStore } from '../store';
import { Question } from '../../type';

const settings = useSettingsStore();

const years = ref<number[]>([]);
const sortMethod = ref<string>('year');

const getYears = async (): Promise<number[]> => {
  const response = await fetch('/api/questions');
  const data: Question[] = await response.json();
  return [...new Set(data.map((q) => q.year))].sort((a, b) => b - a);
};

onBeforeMount(async () => {
  years.value = await getYears();
});
</script>

<style scoped></style>
