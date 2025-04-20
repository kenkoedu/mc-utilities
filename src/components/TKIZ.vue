<template>
  <div> hi </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
// import { Tex2SvgImgTag, tikz } from "tex2svg";
// const source = await Bun.file("@/assets/tkiz.tex").text()
// const svg = ref(``);

// import tex2svg from 'node-tikzjax';

const source = `\\begin{document}
\\begin{tikzpicture}
\\draw (0,0) circle (1in);
\\end{tikzpicture}
\\end{document}`;

const svg = await tex2svg(source);

onBeforeMount(async () => {
  // console.log(svg)
  // const basicTikz = tikz(source)
  // const imgTagCompiler = new Tex2SvgImgTag({ imgtag })
})

</script>

<style scoped></style>
