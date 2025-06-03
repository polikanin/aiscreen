<template>
    <div class="flex flex-wrap gap-2 mt-4">
        <template v-for="tag in tags" :key="tag">
            <button
                v-if="tag"
                @click="$emit('filter', tag)"
                :class="[
          'text-sm px-3 py-1 rounded transition',
          tag === selectedTag
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
            >
                {{ tag }}
            </button>
        </template>

        <button
            @click="$emit('filter', null)"
            :class="[
        'text-sm underline',
        !selectedTag ? 'text-blue-600 font-semibold' : 'text-gray-500'
      ]"
        >
            Clear filter
        </button>
    </div>
</template>

<script setup>
defineProps({
    tags: {
        type: Array,
        required: true,
    },
    selectedTag: {
        type: String,
        default: null,
    },
});
</script>
