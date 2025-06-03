<template>
    <div class="p-4 max-w-xl mx-auto">
        <h1 class="text-xl font-bold mb-4">Create New Template</h1>

        <form @submit.prevent="handleCreate" class="flex flex-col gap-4">
            <input v-model="form.name" class="input" placeholder="Name" required />
            <textarea v-model="form.description" class="input" placeholder="Description" />

            <input v-model="form.width" class="input" type="text" placeholder="Width" required />
            <input v-model="form.height" class="input" type="text" placeholder="Height" required />

            <input
                v-model="form.tags"
                class="input"
                placeholder="Tags (comma-separated)"
            />

            <button class="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                Create Template
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTemplateStore } from '@/store/templateStore';

const form = ref({
    name: '',
    description: '',
    width: '',
    height: '',
    objects: null,
    tags: ''
});

const router = useRouter();
const templateStore = useTemplateStore();

const handleCreate = async () => {
    try {
        await templateStore.createTemplate(form.value);
        router.push('/');
    } catch (error) {
        console.error('Error creating template:', error);
        alert('Failed to create template.');
    }
};
</script>

<style scoped>
.input {
    border: 1px solid #ccc;
    padding: 0.5rem;
    border-radius: 4px;
}
</style>
