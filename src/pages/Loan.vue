<template>
  <div
    class="flex flex-col container gap-6 p-4"
    v-if="Object.keys(loan).length"
  >
    <div class="p-8 bg-white rounded-xl shadow-md">
      <h1 class="text-3xl font-bold mb-6 text-center">Loan Details</h1>
      <div class="mb-6">
        <h2 class="text-2xl font-semibold mb-4">Loan Information</h2>
        <div class="grid grid-cols-2 gap-4">
          <span><strong>Amount:</strong> ${{ loan.amount }}</span>
          <span><strong>Interest Rate:</strong> {{ loan.interestRate }}%</span>
          <span><strong>Term:</strong> {{ loan.term }} days</span>
          <span><strong>Purpose:</strong> {{ loan.purpose }}</span>
          <span><strong>Risk Rating:</strong> {{ loan.riskRating }}</span>
        </div>
        <div>
          <h2 class="text-2xl font-semibold my-4">Collateral Information</h2>
          <div class="grid grid-cols-2 gap-4">
            <p><strong>Type:</strong> {{ loan.collateral.type }}</p>
            <p>
              <strong>Value:</strong> ${{
                loan.collateral.value.toLocaleString()
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row gap-6">
      <div class="p-8 bg-white rounded-xl shadow-md">
        <div class="mb-6">
          <h2 class="text-2xl font-semibold mb-4">Borrower Information</h2>

          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-4">
              <div class="flex items-center gap-4">
                <img
                  class="w-30 h-30 rounded-full"
                  :src="
                    'https://ui-avatars.com/api/?name=' + loan.borrower.name
                  "
                  :alt="loan.borrower.name"
                />
                <p class="text-xl font-medium">{{ loan.borrower.name }}</p>
              </div>

              <p><strong>Email:</strong> {{ loan.borrower.email }}</p>
              <p>
                <strong>Credit Score:</strong> {{ loan.borrower.creditScore }}
              </p>
            </div>

            <div>
              <Doughnut
                :data="scoreData"
                :options="{
                  responsive: true,
                }"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="p-8 bg-white rounded-xl shadow-md flex-grow-[1]">
        <h2 class="text-2xl font-semibold mb-4">Documents</h2>
        <ul class="list-disc list-inside">
          <li
            v-for="document in loan.documents"
            :key="document.type"
            class="mb-2"
          >
            <strong>{{ document.type }}:</strong>
            <img :src="baseAPIURL + document.url" alt="" />
            <!-- <a
            :href="document.url"
            target="_blank"
            class="text-blue-500 underline"
            >{{ document.url }}</a
          > -->
          </li>
        </ul>
      </div>
    </div>

    <div class="p-8 bg-white rounded-xl shadow-md flex-grow-[1]">
      <h2 class="text-2xl font-semibold mb-4 bg">Repayment Schedule</h2>
      <ul class="list-disc list-inside">
        <table class="w-full">
          <thead>
            <tr>
              <th>Due Date</th>
              <th>Amount Due</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="text-center"
              v-for="installment in loan.repaymentSchedule.installments"
              :key="installment.dueDate"
            >
              <td>{{ installment.dueDate }}</td>
              <td>${{ installment.amountDue.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </ul>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useLoanStore } from "@/stores/loans";
import { storeToRefs } from "pinia";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const loanStore = useLoanStore();
const { loans } = storeToRefs(loanStore);
const route = useRoute();
const loan = ref({});

const baseAPIURL = ref(import.meta.env.VITE_API_URL);

const scoreData = {
  labels: ["Score ", "-"],
  datasets: [
    {
      backgroundColor: ["#2563eb", "#e0dcdc"],
      data: [],
    },
  ],
};

onMounted(() => {
  // Search for the loan with the given ID
  loan.value = loans.value.find((loan) => loan.id === route.params.id);
  scoreData.datasets[0].data.push(loan.value.borrower.creditScore);
  scoreData.datasets[0].data.push(1000 - loan.value.borrower.creditScore);
});
</script>
  
