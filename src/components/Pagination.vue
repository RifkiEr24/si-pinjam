<template>
  <div class="flex justify-center mt-4">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="px-4 py-2 mx-1 border rounded disabled:opacity-50 bg-blue-500 text-white font-bold"
    >
      Previous
    </button>
    <span class="px-4 py-2 mx-1">{{ currentPage }} / {{ totalPages }}</span>
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 mx-1 border rounded disabled:opacity-50 bg-blue-500 text-white font-bold"
    >
      Next
    </button>
  </div>
</template>
  
  <script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
});

const emit = defineEmits(["update:currentPage"]);

const currentPage = ref(1);

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

watch(currentPage, (newPage) => {
  emit("update:currentPage", newPage);
});
</script>
  
  <style scoped>
button:disabled {
  cursor: not-allowed;
}
</style>