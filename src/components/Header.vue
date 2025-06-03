<template>
    <div class="flex justify-between items-center p-2 gap-2 border-b">
        <RouterLink to="/" class="text-blue-500 hover:underline font-semibold" v-if="auth.token">
            Main
        </RouterLink>

        <LogoutBtn />
    </div>
</template>

<script setup>
import LogoutBtn from '@/components/LogoutBtn.vue';
import {useAuthStore} from "@/store/authStore";
const auth = useAuthStore();
</script>

<style scoped lang="scss">

</style>