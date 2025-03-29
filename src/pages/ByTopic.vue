<template>
  <h2>{{ settings.lang == "e" ? "All questions (BY TOPIC)" :
    "按課題" }}</h2>
  <div class="d-flex mb-3">
    <div class="me-3">
      <label for="topic-sort">{{ settings.lang == "e" ?
        "Topics Sort by:" : "課題排序：" }}</label>
      <BFormSelect id="topic-sort"
        v-model="topicSortMethod">
        <BFormSelectOption value="">{{ settings.lang == "e"
          ? "Default" : "默認" }}</BFormSelectOption>
        <BFormSelectOption value="hk_percent">{{
          settings.lang == "e" ? "HK Percent" : "香港百分比" }}
        </BFormSelectOption>
        <BFormSelectOption value="count">{{ settings.lang ==
          "e" ? "Count" : "出現次數" }}</BFormSelectOption>
      </BFormSelect>
    </div>
    <div>
      <label for="question-sort">{{ settings.lang == "e" ?
        "Questions Sort by:" : "問題排序：" }}</label>
      <BFormSelect id="question-sort"
        v-model="questionSortMethod">
        <BFormSelectOption value="year">{{ settings.lang ==
          "e" ? "Year" : "年份" }}</BFormSelectOption>
        <BFormSelectOption value="hk_percent">{{
          settings.lang == "e" ? "HK Percent" : "香港百分比" }}
        </BFormSelectOption>
      </BFormSelect>
    </div>
  </div>
  <div>
    <div v-for="topic of combinedResults" :key="topic.t_id">
      <TopicQuestions :t_id="topic.t_id" :is-review="false"
        :show-ans="false" :sort-method="questionSortMethod"
        :topic-title="topic.t_id + '. ' + (settings.lang == 'e' ? topicTitles[topic.t_id]?.t_title : topicTitles[topic.t_id]?.t_title_c)"
        :collapsed="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useSettingsStore } from '../store';
import topicsJSON from '@/assets/db/topics.json';
import { getCombinedResults } from '@/utils/calculateAverage'; // Import the function
import type { Topic } from '../../type.d.ts';

const settings = useSettingsStore();

// Load topics and calculate combined results
const topics = ref<Topic[]>(topicsJSON as Topic[]);
const combinedResults = ref(getCombinedResults()); // Get combined results from the utility function

// Map topic titles for easier access
const topicTitles = computed(() => {
  const map: Record<number, { t_title: string; t_title_c: string }> = {};
  topics.value.forEach((topic) => {
    map[topic.t_id] = { t_title: topic.t_title, t_title_c: topic.t_title_c };
  });
  return map;
});

const questionSortMethod = ref<string>('year');
const topicSortMethod = ref<'' | 'hk_percent' | 'count'>('');

watch(() => topicSortMethod.value, (newVal) => {
  if (newVal === 'hk_percent') {
    combinedResults.value.sort((a, b) => b.average_hk_percent - a.average_hk_percent);
  }
  else if (newVal === 'count') {
    combinedResults.value.sort((a, b) => b.count - a.count);
  } else {
    combinedResults.value.sort((a, b) => a.t_id - b.t_id);
  }
});
</script>

<style scoped>
.d-flex {
  align-items: center;
}

.me-3 {
  margin-right: 1rem;
}
</style>