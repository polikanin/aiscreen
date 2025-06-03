import {defineStore} from 'pinia';
import axios from 'axios';
import {useAuthStore} from './authStore';

export const useTemplateStore = defineStore('templates', {
    state: () => ({
        templates: [],
        tags: [],
    }),
    actions: {
        async fetchTags() {
            const authStore = useAuthStore();
            try {
                const res = await axios.get(
                    'https://dev-api.aiscreen.io/api/v1/canvas_templates/tags/list',
                    {
                        headers: { Authorization: `Bearer ${authStore.token}` },
                    }
                );
                this.tags = res.data;
            } catch (error) {
                console.error('Error loading tags:', error);
            }
        },
        async fetchTemplates() {
            const authStore = useAuthStore();
            const response = await axios.get('https://dev-api.aiscreen.io/api/v1/canvas_templates', {
                headers: {Authorization: `Bearer ${authStore.token}`},
            });
            this.templates = response.data;
        },
        async fetchTemplateById(id) {
            try {
                const authStore = useAuthStore();
                const response = await axios.get(`https://dev-api.aiscreen.io/api/v1/canvas_templates/${id}`, {
                    headers: {Authorization: `Bearer ${authStore.token}`},
                });
                const template = response.data;

                if (!this.templates.find(t => t.id === id)) {
                    this.templates.push(template);
                }

                return template;
            } catch (error) {
                throw new Error('Template not found');
            }
        },
        async createTemplate(templateData) {
            const authStore = useAuthStore();
            const payload = {
                ...templateData,
                tags: templateData.tags
                    ? templateData.tags.split(',').map(t => t.trim())
                    : null
            };

            const response = await axios.post(
                'https://dev-api.aiscreen.io/api/v1/canvas_templates',
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`
                    }
                }
            );

            this.templates.push(response.data);
            return response.data;
        },
        async deleteTemplate(id) {
            const authStore = useAuthStore();
            await axios.delete(`https://dev-api.aiscreen.io/api/v1/canvas_templates`, {
                data: { id: id },
                headers: {
                    Authorization: `Bearer ${authStore.token}`
                }
            });
            this.templates = this.templates.filter(template => template.id !== id);
        },
        async updateTemplate(template) {
            const authStore = useAuthStore();

            try {
                const response = await axios.put(
                    `https://dev-api.aiscreen.io/api/v1/canvas_templates/${template.id}`,
                    {
                        name: template.name,
                        width: String(template.width),
                        height: String(template.height),
                        tags: template.tags || [],
                        objects: template.objects || null,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${authStore.token}`,
                        },
                    }
                );

                const index = this.templates.findIndex(t => t.id === template.id);
                if (index !== -1) {
                    this.templates[index] = response.data;
                }

                return response.data;
            } catch (error) {
                console.error('Error updating template:', error);
                throw error;
            }
        },
    },
});
