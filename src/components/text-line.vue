<script setup lang="ts">    
    const props = defineProps(["line"])
</script>

<template>
    <div class="line">{{ line }}</div>
</template>

<style scoped>
    .line {
        background-color: lightblue;
        width: 80%;
        padding: 10px;
        margin: 10px;

        font-size: 1.5rem;

        border-radius: 10px;
    }

    .line:first-child {
        margin-top: 3rem;
    }
</style>
