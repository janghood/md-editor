<template>
  <Test />
  <!-- <EditPage /> -->
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import EditPage from './views/EditPage.vue';
import Test from './views/Test.vue';

export default defineComponent({
  components: { EditPage, Test }
})
</script>

<style>
</style>
