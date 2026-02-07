<script setup lang="ts">
import { ref } from "vue";

import TextLine from "./components/text-line.vue";
import Socket from "./components/socket.vue";
import { Subscription } from "rxjs";
import { newLine$ } from "./store/store";

let lineData = ref([]);

const sub = new Subscription();
sub.add(
  newLine$.subscribe((change) => {
    lineData.value.push(change);
  }),
);
</script>

<template>
  <Socket></Socket>
  <ul>
    <TextLine v-for="item in lineData" :line="item"></TextLine>
  </ul>
</template>

<style scoped>
</style>
