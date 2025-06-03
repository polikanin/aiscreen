import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import TemplateView from '../views/TemplateView.vue';
import AddTemplate from '../views/AddTemplate.vue';
import { useAuthStore } from '@/store/authStore';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/template/:id', name: 'Template', component: TemplateView, props: true },
  { path: '/add-template', name: 'AddTemplate', component: AddTemplate }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.name !== 'Login' && !authStore.token) next({ name: 'Login' })
  else next()
})

export default router;