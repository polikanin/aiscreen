<template>
    <div class="p-4 max-w-xl mx-auto">
        <h1 class="text-xl font-bold mb-4">Edit template</h1>

        <form @submit.prevent="handleSave" class="flex flex-col gap-4">
            <input v-model="localTemplate.name" class="input" placeholder="Name" />

            <input
                v-model.number="localTemplate.width"
                class="input"
                type="number"
                placeholder="Width"
                min="1"
            />
            <input
                v-model.number="localTemplate.height"
                class="input"
                type="number"
                placeholder="Height"
                min="1"
            />

            <div>
                <label class="block mb-1 text-sm font-medium">Tags (comma separated)</label>
                <input
                    v-model="tagsString"
                    class="input"
                    placeholder="e.g. promo, sale"
                />
            </div>

            <button class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                Save
            </button>
        </form>
    </div>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router';
import {useTemplateStore} from '@/store/templateStore';
import {ref, onMounted, watch} from 'vue';

const route = useRoute();
const router = useRouter();
const store = useTemplateStore();

const localTemplate = ref({
    id: null,
    name: '',
    width: 0,
    height: 0,
    tags: [],
    preview_image: '',
});

const tagsString = ref('');

onMounted(async () => {
    const id = route.params.id;
    let found = store.templates.find(t => t.id === Number(id));

    if (!found) {
        try {
            found = await store.fetchTemplateById(id);
        } catch (err) {
            console.error(err);
            return router.push('/');
        }
    }

    localTemplate.value = {
        ...found,
        width: Number(found.width),
        height: Number(found.height),
        tags: found.tags || [],
        preview_image: found.preview_image || '',
    };

    tagsString.value = localTemplate.value.tags.join(', ');
});

watch(tagsString, (newVal) => {
    localTemplate.value.tags = newVal
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);
});

const handleSave = async () => {
    await store.updateTemplate(localTemplate.value);
};
</script>

<style scoped>
.input {
    border: 1px solid #ccc;
    padding: 0.5rem;
    border-radius: 4px;
    width: 100%;
}
</style>
