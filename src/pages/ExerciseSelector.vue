<template>
  <BContainer fluid>
    <BForm class="no-print">
      <BFormGroup label="Categories" label-cols-lg="2"
        label-cols-md="4" class="my-1">
        <VueMultiselect v-if="topics.length"
          v-model="topicsSelected" :options="options"
          :close-on-select="false" :multiple="true"
          label="text" track-by="text" />
      </BFormGroup>
      <BFormGroup label="Exercise Name" label-cols-lg="2"
        label-cols-md="4" class="my-1">
        <BFormInput v-model="exName"></BFormInput>
      </BFormGroup>
      <BFormGroup label="Instructions" label-cols-lg="2"
        label-cols-md="4" class="my-1">
        <BFormTextarea v-model="instructions"></BFormTextarea>
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
      <h5 style="page-break-after: avoid;">
        {{ topic.value.id }}. {{ topic.value.t_title }}
      </h5>
      <TopicQuestions :t-id="topic.value.id"
        :is-review="false" :show-ans="false"
        :key="topicsSelected.length" />
    </div>
  </BContainer>
</template>

<script setup lang="ts">
import { getTopics } from '../db/db';
import { onBeforeMount, ref, computed } from 'vue';
import VueMultiselect from 'vue-multiselect'
import { Tables } from '../db/types';
const topics = ref<Tables<"mc_topics">[]>([])
const options = computed(() => topics.value.map(a => ({
  value: a,
  text: a.id + ". " + a.t_title
})))
const topicsSelected = ref<{ value: any }[]>([])
onBeforeMount(async () => {
  topics.value = await getTopics()
})

const exName = ref("")
const instructions = ref("")
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>  