<template>
        <router-link :to="'loan/' + loan.id" class="bg-white p-5 rounded-xl flex flex-col gap-3 shadow-md hover:scale-105 transition-all duration-700 h-min" v-if="Object.keys(loan).length">
            <div class="flex items-center gap-2">
                <img class="w-10 h-10 rounded-full" :src="'https://ui-avatars.com/api/?name=' + loan.borrower.name" :alt="loan.borrower.name">
                <span class="font-medium">{{ loan.borrower.name }}</span>
            </div>
            <div class="text-sm">
                <span>
                Amount: <span class="font-medium text-green-600">  $ {{ loan.amount }} </span>
                </span>
            </div>
            <div class="text-sm flex items-center justify-between">
                <span>
                Rate: <span class="font-medium text-red-600">  {{ loan.interestRate }} % </span>
                </span>
                <span>
                Term: <span class="font-medium text-blue-600">  {{ loan.term }} days </span>
                </span>
            </div>
           
        </router-link>
</template>

<script setup>

 defineProps({
    loan: {
        type: Object,
        required: true
    
    }
})

</script>

<style lang="scss" scoped>

</style>