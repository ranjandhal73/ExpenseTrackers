import React, { useState, useContext, useEffect } from "react";
import { ExpenseContext } from "../store/ExpenseContext";
import ExpenseList from "./ExpenseList";
import toast from "react-hot-toast";

function ExpenseForm() {
  const [spentMoney, setSpentMoney] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");

  const { expense, addExpense } = useContext(ExpenseContext);
  
  const expenseHandler = async () => {
    const newExpense = { id: Math.random(), spentMoney, desc, category };

    try {
      const response = await fetch('https://expensetracker-ea711-default-rtdb.firebaseio.com/usersExpense.json', {
        method: 'POST',
        body: JSON.stringify(newExpense),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const err = await response.json();
        console.log(err);
      }

      const data = await response.json();
      addExpense(data);
      toast.success('Expense has been added!');
    } catch (error) {
      console.error('Error adding expense:', error);
    }

    setSpentMoney('');
    setDesc('');
    setCategory('');
  };
  
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-[3rem] gap-4 bg-gray-300 py-[3rem] w-[50%] mx-auto">
        <label className=" ">
          <input
            className="border-2 block"
            type="text"
            placeholder="Spent Money"
            value={spentMoney}
            onChange={(e) => setSpentMoney(e.target.value)}
          />
        </label>
        <label>
          <input
            className="border-2 block"
            type="text"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">Select Category</option>
          <option value="fuel">Fuel</option>
          <option value="petrol">Petrol</option>
          <option value="salary">Salary</option>
        </select>
        <button
          onClick={expenseHandler}
          className="bg-green-700 text-white px-6 py-2 rounded"
        >
          Submit
        </button>
      </div>
     {
        expense.map((item) => (
           <ExpenseList key={Math.random()} expense={item}/>
        ))
     }
    </>
  );
}

export default ExpenseForm;
