<template>
  <div class="flex bg-gray-800 rounded-md shadow-lg overflow-hidden">
    <div class="w-24 flex-shrink-0 bg-gray-900 flex items-center justify-center p-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        class="h-full w-full text-white"
      >
        <path
          fill="currentColor"
          d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z"
        />
      </svg>
    </div>

    <div class="flex flex-col gap-2 p-4 bg-white flex-1 rounded-r-md">
      <p class="text-sm">
        <span class="font-semibold text-gray-700">Name:</span>
        <span class="text-gray-900 ml-1">{{ `${props.name.first} ${props.name.last}` }}</span>
      </p>

      <p class="text-sm">
        <span class="font-semibold text-gray-700">Email:</span>
        <a :href="`mailto:${props.email}`" class="text-blue-600 hover:underline ml-1">{{
          props.email
        }}</a>
      </p>

      <p class="text-sm">
        <span class="font-semibold text-gray-700">Phone number:</span>
        <a :href="`tel:${props.phone}`" class="text-blue-600 hover:underline ml-1">{{
          props.phone
        }}</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IUser } from '@/interfaces/IUser'

const props = defineProps<IUser>()
</script>
