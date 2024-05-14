import { createContext, useState, useEffect } from "react";

export const ExpenseContext = createContext({
    expense: [],
    addExpense: (expense) => {},
    removeExpense: (id) => {},
})

const ExpenseContextProvider = ({children}) =>{
    const [expense, setExpense] = useState([])

    const addExpenseHandler = (expense) =>{ 
        for (const key in expense){  
            setExpense((prevExpense) =>  {      
                return [...prevExpense, expense[key] ]
              })
      }
        
    }
    const removeExpenseHandler = (id) =>{
        setExpense((prevExpense) => prevExpense.filter(expense => expense.id !== id))
    }

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch('https://expensetracker-ea711-default-rtdb.firebaseio.com/usersExpense.json');
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            const loadedExpenses = [];
            for (const key in data) {
              loadedExpenses.push({
                id: key,
                ...data[key]
              });
            }
            setExpense(loadedExpenses);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData();
      }, []);

    const contextValue = {
        expense: expense,
        addExpense: addExpenseHandler,
        removeExpense: removeExpenseHandler
    }


    return <ExpenseContext.Provider value={contextValue}>
        {children}
    </ExpenseContext.Provider>
}
export default ExpenseContextProvider;