<template>
  <BContainer fluid class="p-0">
    <BFormSelect v-model="student" :options="options" />
    <BButton @click="callPrint">Print</BButton>
    <StudentReportContainer :student="student" id="report"
      v-if="student" class="p-0"
      :key="student ? student.class_num : 0" />
  </BContainer>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue';
import { usePaperizer } from 'paperizer'
import { getStudents } from '../db/db';
import StudentReportContainer from './StudentReportContainer.vue';
import { Tables } from '../db/types.ts.bak';

const students = ref<Tables<"mc_six_s_students">[]>([])
const student = ref<Tables<"mc_six_s_students">>()
const printIndex = ref(0)
const options = computed(() => students.value.map((s) => {
  // console.log(s)
  return {
    value: s,
    text: s.class_num + '. ' + s.name_e
  }
}))

const callPrint = () => {
  const { paperize } = usePaperizer('report', {
    windowTitle: student.value?.class_num + ". HKDSE MC Personalized Study Kit",
    styles: [
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
    ]
  }, () => {
    printIndex.value = printIndex.value + 1
    student.value = students.value[printIndex.value]
    setTimeout(() => {
      callPrint()
    }, 3000);
  })
  paperize()
}

onBeforeMount(async () => {
  students.value = await getStudents() || [];
});
</script>

<style scoped></style>
