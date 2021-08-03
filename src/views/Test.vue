<template>
  <div class="content">

    <MilkdownTestEditor />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { MilkdownTestEditor } from '../components/MilkdownTestEditor';

export default defineComponent({
  name: 'Test',
  components: { MilkdownTestEditor }
})
</script>

<style lang="scss">
.milkdown {
  .editor {
    margin: 2px 0;
    .heading {
      margin: 1rem 0;
    }
  }
}

</style>
