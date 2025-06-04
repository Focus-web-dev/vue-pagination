<template>
  <div class="flex justify-center p-4 h-full">
    <div class="flex flex-col w-full h-full items-center justify-between">
      <ul class="relative flex flex-col gap-4 w-full h-full overflow-y-scroll pr-4">
        <div v-if="isLoading" class="absolute top-0 left-0 w-full h-full bg-secondary/50" />

        <li v-for="user in currentUsers" :key="user.id.value">
          <UserCard v-bind="user" />
        </li>
      </ul>

      <BasePagination
        :currentPage="currentUsersPage"
        :pagesCount="totalUsersPages"
        :maxPagesToShow="10"
        @switchPage="onSwitchPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios, { type AxiosPromise } from 'axios'
import { ref, reactive, computed, onMounted } from 'vue'

import UserCard from '@/components/UserCard.vue'
import BasePagination from '@/components/BasePagination.vue'
import type { IUser } from '@/interfaces/IUser'
import type { IResponse } from '@/interfaces/IResponse'

type FetchUsersResponse = Promise<AxiosPromise<IResponse<IUser>>>

const currentUsersPage = ref(1)
const usersPerPage = ref(3)
const totalUsersPages = ref(99)

const usersMap = reactive<Record<string, IUser[]>>({})

const isLoading = ref(false)

const currentUsers = computed(() => {
  return usersMap[currentUsersPage.value]
})

onMounted(async () => addUsers(currentUsersPage.value))

const fetchUsers = async (page: number, results: number, seed = 'abc'): FetchUsersResponse => {
  const baseUrl = import.meta.env.VITE_APP_API_BASE_URL

  const requestOptions = {
    params: {
      page,
      results,
      seed,
      inc: 'id, name, email, phone',
    },
  }

  return await axios.get(baseUrl, requestOptions)
}

const addUsers = async (newPageNumber: number) => {
  const isCached = usersMap.hasOwnProperty(newPageNumber.toString())

  if (isCached) {
    return
  }

  isLoading.value = true

  try {
    const response = await fetchUsers(newPageNumber, usersPerPage.value)
    const newUsersPageData = response.data.results

    if (!newUsersPageData || !newUsersPageData.length) {
      return
    }

    usersMap[newPageNumber] = newUsersPageData
  } finally {
    isLoading.value = false
  }
}

const onSwitchPage = async (page: number) => {
  await addUsers(page)

  currentUsersPage.value = page
  console.log('Switched to page:', page)
}
</script>
