<template>
    <button @click="handleLogout" class="bg-red-500 text-white font-semibold p-2 rounded hover:bg-red-600 transition" v-if="auth.token">
        Logout
    </button>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

function handleLogout() {
    auth.logout();
    router.push('/login');
}
</script>

<style scoped>

</style>
