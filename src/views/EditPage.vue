<template>
  <div class="content">
    <MilkdownEditor />
    <div id="test"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { MilkdownEditor } from '../components/MilkdownEditor';

export default defineComponent({
  name: 'EditPage',
  components: { MilkdownEditor }
})
</script>

<style>
</style>
