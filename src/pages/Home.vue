<template>
  <div class="container">
    <div
      class="flex flex-col lg:flex-row gap-4 w-full justify-between items-center p-4"
    >
      <div class="flex flex-col lg:flex-row gap-4 w-full">
        <!-- Filters -->
        <input
          type="number"
          v-model.number="filters.amount"
          placeholder="Max Loan Amount"
          class="p-2 border rounded"
        />
        <input
          type="number"
          v-model.number="filters.interestRate"
          placeholder="Max Interest Rate"
          class="p-2 border rounded"
        />
        <input
          type="number"
          v-model.number="filters.term"
          placeholder="Max Term"
          class="p-2 border rounded"
        />
      </div>
      <div class="w-full">
        <!-- Sorting -->
        <select v-model="sortOption" class="p-2 border rounded w-full">
          <option value="">Sort by</option>
          <option value="amount">Loan Amount</option>
          <option value="interestRate">Interest Rate</option>
          <option value="term">Term</option>
        </select>
      </div>
    </div>
    <div class="min-h-[664px]" v-if="paginatedLoans.length">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
        <loan-item v-for="loan in paginatedLoans" :key="loan.id" :loan="loan" />
      </div>
    </div>
    <div
      v-if="!paginatedLoans.length"
      class="min-h-[75vh] flex flex-col gap-8 items-center justify-center"
    >
      <NotFound />
      <p class="text-center text-3xl font-medium">No loans found.</p>
    </div>

    <pagination
      v-if="paginatedLoans.length"
      :totalItems="filteredLoans.length"
      :itemsPerPage="itemsPerPage"
      v-model:currentPage="currentPage"
    />
  </div>
</template>
  
  <script setup>
import { storeToRefs } from "pinia";
import { useLoanStore } from "@/stores/loans";
import { ref, computed, onMounted, watch } from "vue";
import LoanItem from "@/components/LoanItem.vue";
import Pagination from "@/components/Pagination.vue";
import NotFound from "@/components/NotFound.vue";

const loanStore = useLoanStore();
const { loans } = storeToRefs(loanStore);

const filters = ref({
  amount: null,
  interestRate: null,
  term: null,
});

const sortOption = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Fetch loans data
const handleGetData = async () => {
  try {
    await loanStore.getLoans();
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  handleGetData();
});

//Filtered Loan
const filteredLoans = computed(() => {
  return loans.value.filter((loan) => {
    const matchesAmount = filters.value.amount
      ? loan.amount <= filters.value.amount
      : true;
    const matchesInterestRate = filters.value.interestRate
      ? loan.interestRate <= filters.value.interestRate
      : true;
    const matchesTerm = filters.value.term
      ? loan.term <= filters.value.term
      : true;
    return matchesAmount && matchesInterestRate && matchesTerm;
  });
});

// Sorting

const sortedLoans = computed(() => {
  return filteredLoans.value.slice().sort((a, b) => {
    if (sortOption.value === "amount") {
      return a.amount - b.amount;
    } else if (sortOption.value === "interestRate") {
      return a.interestRate - b.interestRate;
    } else if (sortOption.value === "term") {
      return a.term - b.term;
    } else {
      return 0;
    }
  });
});

// Pagination
const paginatedLoans = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedLoans.value.slice(start, end);
});

// Reset to page 1 every filter
watch(filters, () => {
  currentPage.value = 1;
});
</script>
  
  <style lang="scss" scoped>
</style>