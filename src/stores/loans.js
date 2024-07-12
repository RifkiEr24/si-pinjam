import { defineStore } from "pinia";


import useAxios from "../utils/useAxios";

export const useLoanStore = defineStore('loan', {
    state: () => ({
        loans: JSON.parse(localStorage.getItem('loans')) || [],
    }),
    actions: {
      getLoans() {
        new Promise((resolve, reject) => {
          useAxios()
            .get('/json/loans.json')
            .then((response) => {
              this.loans = response.data;
              localStorage.setItem('loans', JSON.stringify(response.data));
              resolve(response);

            })
            .catch((error) => {
              reject(error);
            });
        });
      },
    },
  })