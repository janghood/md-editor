<template>
  <div class="content">
    <MMdEditor v-model="article" :readOnly="false" :options="{}"/>
    <button @click="handleSaveArticle">save</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import demo from '../md/demo.md';

export default defineComponent({
  name: 'EditPage',
  data() {
    return {
      article: demo
    }
  },
  watch: {
    article() {
      console.log(this.article);
    }
  },
  methods: {
    handleSaveArticle() {
      console.log(this.article);
    }
  }
})
</script>

<style>
</style>
