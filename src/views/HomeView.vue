<template>
    <div class="home-view p-4">
        <h1 class="text-xl font-bold mb-4">My templates</h1>
        <div class="mb-4">
            <RouterLink to="/add-template" class="bg-green-500 text-white p-2 rounded">Add template</RouterLink>
        </div>

        <SearchBar @update-search="handleSearch" />

        <FilterTags :tags="tags" :selected-tag="selectedTag" @filter="handleFilter" />

        <p v-if="!filteredTemplates.length" class="text-gray-500 text-center mt-8">No templates</p>

        <div v-else class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            <TemplateCard
                v-for="template in filteredTemplates"
                :key="template.id"
                :template="template"
                @delete="handleDelete"
                @edit="handleEdit"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useTemplateStore } from '@/store/templateStore';
import TemplateCard from '@/components/TemplateCard.vue';
import FilterTags from '@/components/FilterTags.vue';
import SearchBar from '@/components/SearchBar.vue';
import { useRouter } from 'vue-router';
import debounce from 'lodash/debounce';

const templateStore = useTemplateStore();
const router = useRouter();

const searchQuery = ref('');
const selectedTag = ref(null);

templateStore.fetchTemplates();
templateStore.fetchTags();

const tags = computed(() => templateStore.tags);
const templates = computed(() => templateStore.templates);

const filteredTemplates = ref([]);

function filterLocal() {
    let filtered = templates.value;

    if (selectedTag.value) {
        filtered = filtered.filter(template =>
            template.tags && template.tags.includes(selectedTag.value)
        );
    }

    if (searchQuery.value) {
        const searchLower = searchQuery.value.toLowerCase();
        filtered = filtered.filter(template =>
            template.name.toLowerCase().includes(searchLower)
        );
    }

    filteredTemplates.value = filtered;
}

const debouncedFilterLocal = debounce(filterLocal, 300);

watch(searchQuery, () => {
    debouncedFilterLocal();
});

watch(selectedTag, () => {
    filterLocal();
});

watch(templates, () => {
    filterLocal();
});

const handleDelete = async (id) => {
    try {
        await templateStore.deleteTemplate(id);
        filterLocal();
    } catch (error) {
        alert('Error deleting template');
    }
};

const handleEdit = (template) => {
    router.push(`/template/${template.id}`);
};

const handleSearch = (query) => {
    searchQuery.value = query;
};

const handleFilter = (tag) => {
    selectedTag.value = tag;
};
</script>

<style scoped>
.home-view {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
