<script setup lang="ts">
    import { SocketConn } from '@/socket';
    import { onMounted, ref } from 'vue';
    import Settings from './settings.vue';
    import { socketState, sockUrl } from '@/store/store';

    let socket: SocketConn | undefined;
    let sockUrl1: string = sockUrl;    

    onMounted(() => {
        if (socket) {
			socket.disconnect();
		} else {
			socket = new SocketConn(sockUrl);
			// socketConnection.connect();
		}
    })

    const updated = (e) => {
        sockUrl1 = e;
        socket.disconnect();
        socket = new SocketConn(sockUrl1)
    }

    const state = ref(null);
    socketState.subscribe((val) => {
        state.value = val;
    })

    const retry = () => {
        socket.disconnect();
        socket = new SocketConn(sockUrl1)
    }
</script>

<template>
  <Settings @port="updated"></Settings>
  <div v-if="state == 1" class="status-success">Connection Success</div>
  <div v-else class="status-failed" @click="retry">Connection Failed</div>
</template>

<style scoped></style>
