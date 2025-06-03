<template>
    <form @submit.prevent="handleLogin" class="flex flex-col gap-4 p-6 bg-white rounded shadow-md max-w-sm mx-auto">
        <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            class="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
            type="submit"
            class="bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
        >
            Login
        </button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';

const email = ref('hello@aiscreen.io');
const password = ref('Demo!1234');
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
    try {
        await authStore.login(email.value, password.value);
        router.push('/');
    } catch (error) {
        alert(error.message);
    }
};
</script>
