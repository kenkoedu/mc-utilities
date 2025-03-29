<template>
  <BContainer fluid>
    <BForm class="no-print">
      <BFormGroup
        :label="settings.lang == 'e' ? 'Topics' : '課題'"
        label-cols-lg="2" label-cols-md="4" class="my-1">
        <VueMultiselect v-if="topics.length"
          v-model="topicsSelected" :options="options"
          :close-on-select="false" :multiple="true"
          label="text" track-by="text" />
      </BFormGroup>
      <BFormGroup
        :label="settings.lang == 'e' ? 'Exercise Name' : '練習名稱'"
        label-cols-lg="
        2" label-cols-md="4" class="my-1">
        <BFormInput v-model="exName"></BFormInput>
      </BFormGroup>
      <BFormGroup
        :label="settings.lang == 'e' ? 'Instructions' : '練習指示'"
        label-cols-lg="2" label-cols-md="4" class="my-1">
        <BFormTextarea v-model="instructions">
        </BFormTextarea>
      </BFormGroup>
      <BFormGroup
        :label="settings.lang == 'e' ? 'Sort Method' : '排序方法'"
        label-cols-lg="2" label-cols-md="4" class="my-1">
        <BFormSelect v-model="sortMethod">
          <BFormSelectOption value="">
            {{ settings.lang == 'e' ? 'Default' : '預設' }}
          </BFormSelectOption>
          <BFormSelectOption value="hk_percent">
            {{ settings.lang == 'e' ? 'From the easiest' :
              '最易至最難' }}
          </BFormSelectOption>
        </BFormSelect>
      </BFormGroup>
    </BForm>
    <h3 class="my-3">{{ exName }}</h3>
    <BCard v-if="instructions.length"
      style="white-space: pre-wrap;">
      {{ instructions }}
    </BCard>
    <BRow class="my-5">
      <BCol cols="4">
        Name: __________________
      </BCol>
      <BCol cols="5">Class (Class No.): __________________
      </BCol>
      <BCol cols="3">Date: __________</BCol>
    </BRow>
    <div v-for="(topic, i) of topicsSelected" :key="i">
      <TopicQuestions :t_id="topic.value" :is-review="false"
        :show-ans="false" :sort-method="sortMethod"
        :topicTitle="topic.text"
        :key="topicsSelected.length + sortMethod" />
    </div>
  </BContainer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import VueMultiselect from 'vue-multiselect';
import { useSettingsStore } from '@/store'; // Updated import
import { Topic } from '../../type';
import topicsJSON from '@/assets/db/topics.json';

const settings = useSettingsStore();

const topics = ref<Topic[]>(topicsJSON as Topic[]);
const options = computed(() =>
  topics.value.map((a) => ({
    value: a.t_id,
    text: a.t_id + '. ' + (settings.lang == 'e' ? a.t_title : a.t_title_c),
  }))
);
const topicsSelected = ref<{ value: number, text: string }[]>([]);


const exName = ref<string>('');
const instructions = ref<string>('');
const sortMethod = ref<string>('');
</script>

<style
  src="vue-multiselect/dist/vue-multiselect.css"></style>
