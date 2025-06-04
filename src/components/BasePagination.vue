<template>
  <nav class="flex justify-center items-center py-4">
    <div
      class="flex items-center rounded-full bg-white shadow-lg overflow-hidden py-2 px-4 gap-2 sm:gap-1"
    >
      <button
        @click="onSwitchPage(props.currentPage - 1)"
        :disabled="!showPreviousButton"
        :class="
          showPreviousButton
            ? 'text-secondary hover:bg-primary/30'
            : 'text-gray-400 cursor-not-allowed'
        "
        class="p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
        aria-label="Previous page"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <template v-for="(page, index) in visiblePages" :key="index">
        <button
          v-if="typeof page === 'number'"
          @click="onSwitchPage(page)"
          :class="
            page === currentPage ? 'bg-primary text-white' : 'text-secondary hover:bg-primary/30'
          "
          class="w-8 h-8 flex items-center justify-center rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
          :aria-current="page === currentPage ? 'page' : undefined"
        >
          {{ page.toString() }}
        </button>

        <span
          v-else
          class="text-secondary px-2 flex items-center justify-center"
          aria-hidden="true"
        >
          ...
        </span>
      </template>

      <button
        @click="onSwitchPage(currentPage + 1)"
        :disabled="!showNextButton"
        :class="{ 'text-gray-400 cursor-not-allowed': showNextButton }"
        class="p-2 rounded-full text-secondary hover:bg-primary/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
        aria-label="Next page"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type PagesArray = (number | '...')[]

const props = withDefaults(
  defineProps<{
    currentPage: number
    pagesCount: number
    maxPagesToShow?: number
    itemsPerPage?: number
  }>(),
  {
    maxPagesToShow: 5,
    itemsPerPage: 5,
  },
)

const emit = defineEmits(['switchPage'])

const onSwitchPage = (page: number) => {
  if (page >= 1 && page <= props.pagesCount) {
    emit('switchPage', page)
  }
}

const showPreviousButton = computed(() => props.currentPage > 1)
const showNextButton = computed(() => props.currentPage < props.pagesCount)

const getVisiblePages = (current: number, total: number, maxToShow: number): PagesArray => {
  if (total <= maxToShow) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: PagesArray = []
  const surroundingCount = Math.max(1, Math.floor((maxToShow - 3) / 2))

  const shouldShowLeftDots = current > surroundingCount + 2
  const shouldShowRightDots = current < total - surroundingCount - 1

  const centerStartPage = shouldShowLeftDots ? current - surroundingCount : 2
  const centerEndPage = shouldShowRightDots ? current + surroundingCount : total - 1

  pages.push(1)

  if (shouldShowLeftDots) {
    pages.push('...')
  }

  for (let i = centerStartPage; i <= centerEndPage; i++) {
    if (i > 1 && i < total) {
      pages.push(i)
    }
  }

  if (shouldShowRightDots) {
    pages.push('...')
  }

  pages.push(total)

  while (pages.length > maxToShow) {
    const firstDots = pages.indexOf('...')
    const lastDots = pages.lastIndexOf('...')

    if (firstDots !== lastDots && lastDots - firstDots > 1) {
      pages.splice(firstDots + 1, 1)
    } else if (lastDots > 0 && pages[lastDots - 1] !== 1) {
      pages.splice(lastDots - 1, 1)
    } else {
      pages.splice(firstDots + 1, 1)
    }
  }

  return pages
}

const visiblePages = computed(() => {
  return getVisiblePages(props.currentPage, props.pagesCount, props.maxPagesToShow)
})
</script>
