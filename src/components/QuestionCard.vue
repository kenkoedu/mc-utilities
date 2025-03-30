<template>
  <BCard :key="question.id" class="question-card">
    <BCardBody>
      <BContainer fluid>
        <div
          class="d-flex flex-column flex-md-row align-items-start">
          <h6>{{ i + 1 }}. </h6>
          <div class="mx-3">
            <!-- Show text if available and hasImage is false, otherwise show the image -->
            <div
              v-if="questionText && !questionDetails.hasImage && settings.lang === 'c'"
              class="question-text">
              <p>
                <Katex :text="questionText" />
              </p>
              <div class="ps-2 pt-3">
                <ol v-if="questionDetails?.isStatements"
                  type="I">
                  <li
                    v-for="(statement, index) in questionDetails.statements"
                    :key="index" class="mb-3">
                    <Katex :text="statement" />
                  </li>
                </ol>
              </div>
              <div class="ps-5 pt-3">
                <ol type="A">
                  <li
                    v-for="(choice, index) in questionDetails.choices"
                    :key="index" class="mb-3">
                    <Katex :text="choice" />
                  </li>
                </ol>
              </div>
            </div>

            <BImg v-else
              :src="getImgUrl(question.q_id.toString(), settings.lang)"
              class="question-image" />
          </div>
          <div
            class="d-flex flex-md-column flex-sm-row align-items-end justify-content-between ms-auto align-self-end">
            <BButton pill variant="outline-secondary"
              class="mb-1">
              <div
                style="display: block; white-space: nowrap;">
                <Calendar class="icon" />
                {{ question.year }}
              </div>
            </BButton>
            <BButton pill variant="outline-secondary"
              class="mb-1">
              <div
                style="display: block; white-space: nowrap;">
                <HelpCircle class="icon" />
                Q{{ question.q_num }}
              </div>
            </BButton>
            <BButton pill v-if="settings.showHKPercent"
              variant="outline-secondary" class="mb-1">
              <div
                style="display: block; white-space: nowrap;">
                <Flag class="icon" />
                {{ question.hk_percent }}%
              </div>
            </BButton>
            <BButton pill v-if="settings.showAns"
              variant="outline-secondary" class="mb-1">
              <div
                style="display: block; white-space: nowrap;">
                <Check class="icon" />
                {{ question.ans }}
              </div>
            </BButton>
          </div>
        </div>
      </BContainer>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSettingsStore } from '../store';
import { Calendar, HelpCircle, Flag, Check } from 'lucide-vue-next';
import questionsText from '@/assets/db/questionsText.json'; // Import questionsText.json
import Katex from '@/components/Katex.vue';

const settings = useSettingsStore();
const props = defineProps(['question', 'i']);
const question = ref(props.question);

const getImgUrl = (id: string, lang: 'e' | 'c') =>
  new URL(`../assets/questions/${id}${lang}.png`, import.meta.url).href;

// Compute the question text and details based on the question ID
const questionDetails = computed(() => {
  return questionsText.find(
    (q) => q.year === question.value.year && q.qNum === question.value.q_num
  );
});

const questionText = computed(() => questionDetails.value?.qText || null);
</script>

<style scoped>
.question-image {
  min-width: 500px;
  width: 100%;
  max-width: 720px;
}

.question-text {
  font-size: 1rem;
  line-height: 1.5;
  white-space: pre-line;
}

@media (max-width: 768px) {
  .question-text {
    font-size: 0.9rem;
  }
}

/* Ensure QuestionCard starts on a new page if it doesn't fit */
@media print {
  .question-card {
    page-break-inside: avoid;
  }
}
</style>