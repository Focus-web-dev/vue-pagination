<script setup lang="ts">
import { ref } from 'vue'
import BasePagination from '@/components/BasePagination.vue'

const currentPage = ref(1)
const totalPages = ref(99)

const onSwitchPage = (page: number) => {
  currentPage.value = page
  console.log('Switched to page:', page)
}
</script>

<template>
  <div class="p-4">
    <p class="mb-4 text-white">Current Page: {{ currentPage }}</p>

    <BasePagination
      :currentPage="currentPage"
      :pagesCount="totalPages"
      :maxPagesToShow="10"
      @switchPage="onSwitchPage"
    />
  </div>
</template>
