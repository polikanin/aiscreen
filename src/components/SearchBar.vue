<template>
    <input
        type="text"
        v-model="searchText"
        placeholder="Search..."
        class="border rounded p-2 w-full"
    />
</template>

<script setup>
import { ref, watch } from 'vue'
import debounce from 'lodash/debounce'

const emit = defineEmits(['update-search'])
const searchText = ref('')

const emitSearch = debounce(() => {
    emit('update-search', searchText.value)
}, 300)

watch(searchText, () => {
    emitSearch()
})
</script>
