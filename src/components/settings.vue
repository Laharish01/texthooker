<script setup lang="ts">
import { ref } from 'vue';
import { sockUrl } from '@/store/store';

const emit = defineEmits(['port'])

const wsURL = ref<string>(sockUrl);

const blurr = (e: any) => {
    emit('port', e.target.value);
}
</script>

<template>
    <div class="container">
        <input :value="wsURL" @blur="blurr" type="text" id="port" placeholder="Enter WS URL">
    </div>
</template>

<style scoped>
    .container {
        position: absolute;
        right: 0;
        margin-right: 2rem;
    }

    #port {
        width: 100%; /* Makes the input field responsive to its container width */
        padding: 12px 20px; /* Adds space inside the input */
        margin: 8px 0; /* Adds space around the input */
        display: inline-block; /* Allows for alignment and sizing */
        border: 1px solid #ccc; /* Sets a standard border color */
        border-radius: 4px; /* Rounds the corners */
        box-sizing: border-box;
    }
</style>
