import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
    }),
    actions: {
        async login(email, password) {
            try {
                const response = await axios.post('https://dev-api.aiscreen.io/api/v1/login', {
                    email,
                    password,
                });
                this.token = response.data.token;
                localStorage.setItem('token', this.token);
            } catch (error) {
                throw new Error('Authorization error');
            }
        },
        logout() {
            this.token = null;
            localStorage.removeItem('token');
        },
    },
});
