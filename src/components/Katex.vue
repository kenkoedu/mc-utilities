<template>
  <div v-html="text" class="ms-3" />
</template>

<script setup lang="ts">
import katex from 'katex';
const props = defineProps({
  text: {
    type: String,
    required: true
  }
});

import { ref, onMounted } from 'vue';
const text = ref(props.text)
// console.log(text.value);
onMounted(() => {
  let textContent = text.value;
  const regexp = /\$(.+?)\$/g;
  text.value = textContent.replaceAll(regexp, function (_match, p1) {
    const strTobeRendered = p1.replaceAll("\\frac", "\\dfrac");
    const rendered = katex.renderToString(strTobeRendered, {
      throwOnError: false,
      displayMode: false,
      errorColor: '#000000',
    })
    return `  ${rendered}  `.replaceAll("$$", "$");
  });
})

</script>

<style scoped>
* {
  font-family: "Noto Serif HK", Inter, system-ui, Avenir, Helvetica, Arial, sans-serif !important;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.katex {
  display: inline-block;
}
</style>