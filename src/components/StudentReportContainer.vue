<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { supabase } from "../db/db.ts";
import { Tables } from "../db/types"
import { BTable } from "bootstrap-vue-next";

const props = defineProps(['student'])

const table = ref();
const student = ref<Tables<'mc_six_s_students'>>(props.student)
// let classNum = 1
const fields = [
  { key: "t_id", label: "" },
  { key: "t_title", label: "" },
  { key: "performance", label: "" },
  { key: "percentage", label: "You" },
  { key: "class_percent", label: "Class" },
  { key: "hk_average", label: "HK" },
];

const getVariant = (a: number | null, b: number | null, c: number | null) => {
  if (a == null || b == null || c == null) return "danger"
  else {
    const sum = (a > b ? 1 : 0) + (a > c ? 1 : 0);
    return sum == 2 ? "success" : sum == 1 ? "warning" : "danger";
  }
};

const getStudentTopicReport = async (class_num: number) => {
  const { data } = await supabase
    .from("mc_student_topic_report")
    .select()
    .eq("class_num", class_num);
  return data?.map((row) => {
    const variant = getVariant(
      row.percentage,
      row.class_percent,
      row.hk_average
    );
    const result = {
      ...row,
      _cellVariants: {
        percentage: variant,
        class_percent: variant,
        hk_average: variant,
      },
    };
    // console.log(result)
    return result
  }).sort((a, b) => (a.performance_index - b.performance_index))
    .sort((_a, b) => b.percentage == 100 ? -1 : 1)
};



onBeforeMount(async () => {
  const b = await getStudentTopicReport(props.student.class_num);
  table.value = b != null ? b : [];
});
</script>

<template>
  <BContainer>
    <h3>{{ student.class_num }}. {{ student.name_e }}</h3>
    <BTable :items="table" :fields="fields" small bordered
      striped style="page-break-after: always;">
      <template #thead-top="_data">
        <b-tr>
          <b-th colspan="2"><span
              class="sr-only">Topic</span></b-th>
          <b-th>Count</b-th>
          <b-th variant="primary" colspan="3">Performance
            (%)</b-th>
        </b-tr>
      </template>
      <template #cell(percentage)="data">
        <div class="text-end font-monospace">
          {{ parseFloat('0' ||
            data.item.percentage).toFixed(2) }}
        </div>
      </template>
      <template #cell(class_percent)="data">
        <div class="text-end font-monospace">
          {{ parseFloat('0' || data.value).toFixed(2) }}
        </div>
      </template>
      <template #cell(hk_average)="data">
        <div class="text-end font-monospace">
          {{ parseFloat('0' || data.value).toFixed(2) }}
        </div>
      </template>
      <template #cell(performance_index)="data">
        <div class="text-end font-monospace">
          {{ parseFloat('0' || data.value).toFixed(2) }}
        </div>
      </template>
    </BTable>
    <div v-for="(topic, j) of table" :key="j">
      <div
        style="page-break-after: avoid; page-break-inside: avoid;">
        <h4>{{ topic.t_id }}. {{ topic.t_title }}</h4>
        <BContainer fluid>
          <BRow>
            <BCol>
              <h5>You: {{ topic.percentage }}% ({{
                topic.performance }})</h5>
            </BCol>
            <BCol>
              <h5>6S: {{ topic.class_percent }}%</h5>
            </BCol>
            <BCol>
              <h5>HK: {{ topic.hk_average }}%</h5>
            </BCol>
          </BRow>
        </BContainer>
      </div>
      <TopicQuestions :t_id="topic.t_id"
        :class_num="student.class_num"
        :key="student.class_num"></TopicQuestions>
    </div>
  </BContainer>
</template>