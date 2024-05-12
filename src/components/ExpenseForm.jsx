import React, { useState, useContext } from "react";
import { ExpenseContext } from "../store/ExpenseContext";
import ExpenseList from "./ExpenseList";

function ExpenseForm() {
  const [spentMoney, setSpentMoney] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");

  const { expense, addExpense } = useContext(ExpenseContext);

  const expenseHandler = () => {
    const expense = { id: Math.random(),spentMoney, desc, category };
    addExpense(expense);

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
           <ExpenseList key={item.id} expense={item}/>
        ))
     }
    </>
  );
}

export default ExpenseForm;
