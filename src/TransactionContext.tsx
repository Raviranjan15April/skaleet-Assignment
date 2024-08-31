import React, { createContext, useState, useContext } from 'react';

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(1000);
  const [beneficiary, setBeneficiary] = useState([]);

  const addTransaction = (amount, account) => {
    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      account,
    };
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
    setBalance(prevBalance => prevBalance - parseFloat(amount));
  };

  const addBeneficiaryList = (firstName, lastName, iban) => {
        const newBeneficiary = {
            firstName: firstName,
            lastName: lastName,
            iban: iban
        };
        setBeneficiary(prevBeneficiary => ([...prevBeneficiary, newBeneficiary]));
    };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, beneficiary, addBeneficiaryList, balance }}>
      {children}
    </TransactionContext.Provider>
  );
};
