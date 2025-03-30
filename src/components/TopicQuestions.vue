<template>
  <div>
    <div class="topic-summary">
      <BCard>
        <BCardText>
          <div class="d-flex">
            <h4 class="flex-grow-1 mx-1">{{ topicTitle ||
              year }}
            </h4>
            <div class="d-flex flex-md-column flex-lg-row">
              <BButton v-if="!year" class="mx-1"
                variant="outline-secondary" pill>
                <Signal />
                {{ settings.lang === 'c' ? '出現次數：' :
                  'Frequency: ' }} {{ questions.length
                }}
              </BButton>
              <BButton class="mx-1"
                variant="outline-secondary" pill>
                <Check />
                {{ settings.lang === 'c' ? '各題平均：' :
                  'Average: ' }} {{ avgCorrectPercentage }}%
              </BButton>
            </div>
            <BButton class="mx-1 no-print"
              variant="outline-secondary" size="lg"
              @click="isCollapsed = !isCollapsed">
              <ChevronDown v-if="!isCollapsed" />
              <ChevronUp v-else />
            </BButton>

          </div>
        </BCardText>
      </BCard>
    </div>
    <div v-if="!isCollapsed">
      <QuestionCard v-for="(question, i) of questions"
        :key="question.q_id" :question="question"
        :show-ans="showAns" :i="i" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch, computed } from 'vue';
import { Signal, Check, ChevronDown, ChevronUp } from 'lucide-vue-next';
import { useSettingsStore } from '../store';
import { BCard, BCardText } from 'bootstrap-vue-next';
import { Question } from '../../type';

import questionsJSON from '@/assets/db/questions.json';
const settings = useSettingsStore();

const props = defineProps<{
  t_id?: number | null;
  isReview?: boolean;
  showAns?: boolean;
  sortMethod?: string;
  topicTitle?: string | number;
  collapsed?: boolean;
  year?: number;
}>();

const questions = ref<Question[]>(questionsJSON);
const getQuestions = async () => {
  console.log("getQuestions")
  let a: Question[] = questionsJSON;
  if (props.t_id) {
    a = questionsJSON.filter((q) => q.t_id.includes(props.t_id!));
  }
  if (props.year) {
    a = questionsJSON.filter((q) => q.year === props.year);
  }
  let b = a.sort((a, b) => {
    if (props.sortMethod === 'year') {
      return a.year - b.year;
    } else if (props.sortMethod === 'hk_percent') {
      return (b.hk_percent || 0) - (a.hk_percent || 0);
    }
    return 0;
  });
  return b;
};

const topicTitle = ref<string | number | undefined>(props.topicTitle);
const avgCorrectPercentage = computed(() => {
  if (questions.value.length === 0) return 0;
  const totalCorrect = questions.value.reduce((sum, q) => sum + (q.hk_percent || 0), 0);
  return (totalCorrect / questions.value.length).toFixed(2);
});

const isCollapsed = ref<boolean>(props.collapsed ?? false);

onBeforeMount(async () => {
  questions.value = await getQuestions();
});

watch(() => [props.sortMethod, props.year], async () => {
  questions.value = await getQuestions();
});
</script>

<style scoped>
.topic-summary {
  margin-bottom: 20px;
}
</style>