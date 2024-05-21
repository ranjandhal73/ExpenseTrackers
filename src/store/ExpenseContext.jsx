import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const ExpenseContext = createContext({
    expense: [],
    addExpense: (expense) => {},
    removeExpense: (id) => {},
    updateExpense: (expense,id) => {},
})

const ExpenseContextProvider = ({children}) =>{
    const [expense, setExpense] = useState([])

    const addExpenseHandler = (expense) =>{ 
      console.log(expense);
            setExpense((prevExpense) =>  {      
                return [...prevExpense, expense ]
              })    
    }
    const removeExpenseHandler = async (id) =>{
      try {
        const response = await fetch (`https://expense-tracker-a6a03-default-rtdb.firebaseio.com/usersExpense/${id}.json`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if(!response.ok){
            const err = await response.json();
            throw new Error(err)
        }
        const data = await response.json();
        setExpense((prevExpense) => prevExpense.filter(expense => expense.id !== id))
        toast.success('Transaction Deleted!')
      } catch (error) {
        toast.error(error.message) 
      }
    }

    const updateExpenseHandler = async (item, id) =>{
      console.log(item,id);
      try {
        const response = await fetch(
          `https://expense-tracker-a6a03-default-rtdb.firebaseio.com/usersExpense/${id}.json`,
          {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
              'Content-Type': 'application/json',
            },
            
          }
        );
        if (!response.ok) {
          const err = await response.json();
          console.log(err);
          throw new Error('Failed to update data');
        }
        const data = await response.json();
        console.log(data);
        setExpense((prevExpense) =>
          prevExpense.map((exp) =>
            exp.id === id ? { id, ...item } : exp
          )
        );
        toast.success('Transaction updated!')
      } catch (error) {
        toast.error('Error updating data:', error);
      }
    }

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch('https://expense-tracker-a6a03-default-rtdb.firebaseio.com/usersExpense.json');
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
        removeExpense: removeExpenseHandler,
        updateExpense: updateExpenseHandler
    }


    return <ExpenseContext.Provider value={contextValue}>
        {children}
    </ExpenseContext.Provider>
}
export default ExpenseContextProvider;