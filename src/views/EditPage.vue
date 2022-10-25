<template>
  <div class="content">
    <button @click="handleSaveArticle">save</button>
    <button @click="modifyArticle">modify</button>
    <MMdEditor v-model="article" :readOnly="false" :options="{}"/>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import demo from '../md/demo.md';

const article = ref(demo);

watch(() => article, () => {
  console.log(article.value);
})

const handleSaveArticle = () => {
  console.log(article.value);
}

const modifyArticle = () => {
  article.value = 'hello world';
}
</script>

<style>
</style>
