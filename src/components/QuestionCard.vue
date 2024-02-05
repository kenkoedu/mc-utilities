<template>
  <BCard :key="question.id" style="page-break-inside: avoid;"
    class="m-0 p-0">
    <BCardBody class="m-0 p-0">
      <BContainer fluid class="m-0 p-0">
        <BRow class="m-0 p-0">
          <BCol cols="9" class="m-0 p-0">
            <BImg
              :src="'src/assets/questions/' + question.id + store.lang + '.png'"
              class="m-0 p-0"
              style="object-position: 0 -10px;" fluid />
          </BCol>
          <BCol cols="3">
            <BListGroup>
              <BListGroupItem>
                {{ question.year }} Q{{ question.q_num }}
              </BListGroupItem>
              <BListGroupItem>
                Hong Kong: {{ question.hk_percent }}%
              </BListGroupItem>
              <BListGroupItem v-if="showAns">
                Answer: {{ question.ans }}
              </BListGroupItem>
            </BListGroup>
          </BCol>
        </BRow>
      </BContainer>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Tables } from "../db/types"
import { useSettingsStore } from '../store';

const store = useSettingsStore()
const props = defineProps(['question', 'showAns'])
const question = ref<Tables<'mc_questions'>>(props.question)
const showAns = ref<boolean>(props['showAns'] && true)
</script>

<style scoped></style>