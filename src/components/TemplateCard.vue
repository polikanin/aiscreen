<template>
    <div class="template-card border rounded shadow p-4 flex flex-col gap-2">
        <h3 class="text-lg font-bold">{{ template.name }}</h3>

        <div class="w-full h-48 rounded mt-2 overflow-hidden bg-gray-100 flex items-center justify-center">
            <img
                v-if="template.preview_image"
                :src="template.preview_image"
                alt="Preview"
                class="w-full h-full object-cover"
            />
            <svg
                v-else
                class="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm3 14l3.586-3.586a2 2 0 012.828 0L17 18M9 10a2 2 0 100-4 2 2 0 000 4z"
                />
            </svg>
        </div>

        <div class="flex gap-2 mt-2">
            <button
                @click="$emit('edit', template)"
                class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
            >
                View/Edit
            </button>
            <button
                @click="$emit('delete', template.id)"
                class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            >
                Delete
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    template: {
        type: Object,
        required: true
    }
});

</script>

<style scoped>
.template-card {
    background-color: #fff;
    transition: transform 0.2s ease;
}
.template-card:hover {
    transform: translateY(-2px);
}
</style>
