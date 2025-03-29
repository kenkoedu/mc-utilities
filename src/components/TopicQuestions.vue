<template>
  <div>
    <div class="topic-summary">
      <BCard>
        <BCardText>
          <div class="d-flex">
            <h3 class="flex-grow-1 mx-1">{{ topicTitle ||
              year }}
            </h3>
            <BButton v-if="!year" class="mx-1"
              variant="outline-secondary" pill size="lg">
              <Signal />
              出現次數：{{ questions.length }}
            </BButton>
            <BButton class="mx-1"
              variant="outline-secondary" size="lg" pill>
              <Check />
              各題平均：{{ avgCorrectPercentage }}%
            </BButton>
            <BButton class="mx-1"
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
import { BCard, BCardText } from 'bootstrap-vue-next';
import { Question } from '../../type';

const props = defineProps<{
  tId?: number | null;
  isReview?: boolean;
  showAns?: boolean;
  sortMethod?: string;
  topicTitle?: string | number;
  collapsed?: boolean;
  year?: number;
}>();

const questions = ref<Question[]>([]);
const topicTitle = ref<string | number | undefined>(props.topicTitle);
const avgCorrectPercentage = computed(() => {
  if (questions.value.length === 0) return 0;
  const totalCorrect = questions.value.reduce((sum, q) => sum + (q.hk_percent || 0), 0);
  return (totalCorrect / questions.value.length).toFixed(2);
});

const getQuestions = async (): Promise<Question[]> => {
  let url = '/api/questions';
  const params = new URLSearchParams();
  if (props.tId) params.append('t_id', props.tId.toString());
  if (props.year) params.append('year', props.year.toString());
  if (props.sortMethod) params.append('sort', props.sortMethod);
  url += `?${params.toString()}`;

  const response = await fetch(url);
  return await response.json();
};

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