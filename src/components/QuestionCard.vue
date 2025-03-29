<template>
  <BCard :key="question.id" class="question-card">
    <BCardBody>
      <BContainer fluid>
        <div class="d-flex">
          <h6 class="align-self-start">{{ i + 1 }}.
          </h6>
          <div class="ms-3">
            <BImg
              :src="getImgUrl(question.q_id.toString(), settings.lang)"
              fluid class="question-image" />
          </div>
          <div>
            <BButton variant="outline-secondary"
              class="mx-1">
              <Calendar class="icon" />
              {{ question.year }}
            </BButton>
            <BButton variant="outline-secondary"
              class="mx-1">
              <HelpCircle class="icon" />
              Q{{ question.q_num }}
            </BButton>
            <BButton v-if="settings.showHKPercent"
              variant="outline-secondary" class="mx-1">
              <Flag class="icon" />
              {{ question.hk_percent }}%
            </BButton>
            <BButton v-if="settings.showAns"
              variant="outline-secondary" class="mx-1">
              <Check class="icon" />
              {{ question.ans }}
            </BButton>

          </div>
        </div>
      </BContainer>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSettingsStore } from '../store';
import { Calendar, HelpCircle, Flag, Check } from 'lucide-vue-next';

const settings = useSettingsStore()
const props = defineProps(['question', 'i'])
const question = ref(props.question)

const getImgUrl = (id: string, lang: 'e' | 'c') => new URL(`../assets/questions/${id}${lang}.png`, import.meta.url).href
</script>

<style scoped>
.question-image {
  min-width: 720px;
  border-radius: 4px;
}

.icon {
  width: 16px;
  height: 16px;
}
</style>