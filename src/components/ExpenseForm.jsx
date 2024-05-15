import React, { useState, useContext } from "react";
import { ExpenseContext } from "../store/ExpenseContext";
import ExpenseList from "./ExpenseList";
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import Modal from "./Modal";

function ExpenseForm() {
  const [spentMoney, setSpentMoney] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [isPlusShowing, setIsPlusShowing] = useState(false);

  const { expense, addExpense } = useContext(ExpenseContext);

  const expenseHandler = async () => {
    const newExpense = { spentMoney, desc, category };

    try {
      const response = await fetch('https://expense-tracker-a6a03-default-rtdb.firebaseio.com/usersExpense.json', {
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

      addExpense({ id: data.name, ...newExpense });
      toast.success('Expense has been added!');
      setIsPlusShowing(false);
    } catch (error) {
      console.error('Error adding expense:', error);
    }

    setSpentMoney('');
    setDesc('');
    setCategory('');
  };

  return (
    <>
      <h1 className="text-center">Transactions</h1>
      <div className="w-full flex justify-center items-center">
        <input
          type="text"
          placeholder="Enter text here"
          className="border-2 block mb-4 px-4 py-2 rounded-lg w-1/2"
        />
        <div
          onClick={() => setIsPlusShowing(true)}
          className="plus-button transform -translate-y-10"
        >
          <CiCirclePlus className="text-5xl text-blue-800" />
        </div>
      </div>
      <div className="text-center text-5xl text-blue-800">
        {!isPlusShowing ? (
          ""
        ) : (
          <Modal  setIsPlusShowing={setIsPlusShowing}/>
        )}
      </div>

      {expense.map((item) => (
        <ExpenseList key={Math.random()} expense={item} />
      ))}
    </>
  );
}

export default ExpenseForm;


/*
<div className="flex flex-col items-center mt-8 md:w-1/2 mx-auto bg-gray-300 p-8 rounded-lg">
            <label>
              <input
                className="border-2 block mb-4 px-4 py-2 w-full"
                type="text"
                placeholder="Spent Money"
                value={spentMoney}
                onChange={(e) => setSpentMoney(e.target.value)}
              />
            </label>
            <label>
              <input
                className="border-2 block mb-4 px-4 py-2 w-full"
                type="text"
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </label>
            <select
              className="border-2 block mb-4 px-4 py-2 w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
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

*/