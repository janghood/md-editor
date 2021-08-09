<template>
  <div class="content">
    <MdEditor v-model:content="article" :readOnly="false"/>
    <button @click="handleSaveArticle">save</button>
  </div>
</template>

<script lang="ts">
/*
 * @Author: 望海潮
 * @Date: 2021-07-28 08:36:48
 * @LastEditTime: 2021-08-08 00:31:50
 * @Description: 
 */
import { defineComponent } from "@vue/runtime-core";
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
