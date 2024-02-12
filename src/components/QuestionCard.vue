<template>
  <BCard :key="question.id"
    style="page-break-inside: avoid; min-width: 750px"
    class="m-0 p-0">
    <BCardBody class="m-0 p-0">
      <BContainer fluid class="m-0 p-0">
        <BRow class="m-0 p-0">
          <BCol md="12" lg="9" class="m-0 p-0">
            <BImg
              :src="getImgUrl(question.id.toString(), settings.lang)"
              class="m-0 p-0" style="min-width: 718px;" />
          </BCol>
          <BCol md="4" lg="3" class="mt-2">
            <BListGroup>
              <BListGroupItem>
                {{ question.year }} Q{{ question.q_num }}
              </BListGroupItem>
              <BListGroupItem>
                Hong Kong: {{ question.hk_percent }}%
              </BListGroupItem>
              <BListGroupItem v-if="settings.showAns">
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

const settings = useSettingsStore()
const props = defineProps(['question'])
const question = ref<Tables<'mc_questions'>>(props.question)
// const showAns = ref<boolean>(props['showAns'] && true)

const getImgUrl = (id: string, lang: 'e' | 'c') => new URL(`../assets/questions/${id}${lang}.png`, import.meta.url).href
</script>

<style scoped></style>