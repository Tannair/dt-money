import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { PriceHighLight } from "../../components/Summary/styles";
import { SearchForm } from "./Components/SearchForm";
import { TransactionsContainer, TransactionsTable } from "./styles";
import axios from "axios";

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

export const Transactions = () => {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    await axios.get('http://localhost:3000/transactions')
      .then(response => {
        setTransactions(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // useEffect não pode ser async 
  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighLight variant={transaction.type}>
                      {transaction.price}
                    </PriceHighLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              )
            })}
            

            {/* <tr>
              <td width="50%">Aluguel</td>
              <td>
                <PriceHighLight variant="outcome">
                  - R$ 1.200,00
                </PriceHighLight>
              </td>
              <td>Casa</td>
              <td>20/04/2023</td>
            </tr> */}

          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
