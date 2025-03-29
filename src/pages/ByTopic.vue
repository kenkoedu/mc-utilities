<template>
  <h2>{{ settings.lang == "e" ? "All questions (BY TOPIC)" :
    "按課題" }}</h2>
  <div class="d-flex mb-3">
    <div class="me-3">
      <label for="topic-sort">{{ settings.lang == "e" ?
        "Topics Sort by:" :
        "課題排序：" }}</label>
      <BFormSelect id="topic-sort" v-model="topicSortMethod"
        @input="updateTopicSortMethod">
        <BFormSelectOption value="">{{ settings.lang ==
          "e" ? "Default"
          : "默認" }}</BFormSelectOption>
        <BFormSelectOption value="hk_percent">{{
          settings.lang
            == "e" ?
            "HK Percent" : "香港百分比" }}</BFormSelectOption>
      </BFormSelect>
    </div>
    <div>
      <label for="question-sort">{{ settings.lang == "e" ?
        "Questions Sort by:" :
        "問題排序：" }}</label>
      <BFormSelect id="question-sort"
        v-model="questionSortMethod">
        <BFormSelectOption value="year">{{ settings.lang ==
          "e" ? "Year"
          : "年份" }}</BFormSelectOption>
        <BFormSelectOption value="hk_percent">{{
          settings.lang
            == "e" ?
            "HK Percent" : "香港百分比" }}</BFormSelectOption>
      </BFormSelect>
    </div>
  </div>
  <div v-for="topic of topics" :key="topic.t_id">
    <TopicQuestions :t-id="topic.t_id" :is-review="false"
      :show-ans="false" :sort-method="questionSortMethod"
      :topic-title="topic.t_id + '. ' + (settings.lang == 'e' ? topic.t_title : topic.t_title_c)"
      :collapsed="true" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { useSettingsStore } from '../store';
import { Topic } from '../../type';

const settings = useSettingsStore();

const topics = ref<Topic[]>([]);
const topicSortMethod = ref<string>('');
const questionSortMethod = ref<string>('year');
const topicContainerKey = ref<number>(0);

const getTopics = async (): Promise<Topic[]> => {
  const response = await fetch(`/api/topics?sort=${topicSortMethod.value}`);
  return await response.json();
};

const updateTopicSortMethod = async () => {
  topicContainerKey.value += 1;
  topics.value = await getTopics();
  console.log('topicContainerKey', topicContainerKey.value);
};

onBeforeMount(async () => {
  topics.value = await getTopics();
});

watch(topicSortMethod, async () => {
  topics.value = await getTopics();
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