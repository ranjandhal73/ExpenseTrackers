import { createPortal } from "react-dom";
import React, { useState, useContext } from "react";
import { ExpenseContext } from "../store/ExpenseContext";
import toast from "react-hot-toast";

function Modal({setIsPlusShowing}) {
  const modalToShow = document.getElementById("modal");
  const [spentMoney, setSpentMoney] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");

  const { addExpense } = useContext(ExpenseContext);

  const expenseHandler = async () => {
    const newExpense = { spentMoney, desc, category };

    try {
      const response = await fetch("https://expense-tracker-a6a03-default-rtdb.firebaseio.com/usersExpense.json", {
        method: "POST",
        body: JSON.stringify(newExpense),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const err = await response.json();
        console.log(err);
      }

      const data = await response.json();

      addExpense({ id: data.name, ...newExpense });
      toast.success("Expense has been added!");
    } catch (error) {
      console.error("Error adding expense:", error);
    }

    setSpentMoney("");
    setDesc("");
    setCategory("");
  };

  return createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-blue-400 p-8 rounded-lg w-full max-w-md">
        <button onClick={()=>setIsPlusShowing(false)}>Close</button>
        <h1 className="text-center text-2xl font-bold mb-4">Add New Transaction</h1>
        <input
          type="text"
          placeholder="Expense Name"
          className="border-2 block mb-4 px-4 py-2 w-full rounded-md"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="flex gap-4 mb-4">
          <input type="date" className="border-2 px-4 py-2 rounded-md w-full" />
          <input type="datetime-local" className="border-2 px-4 py-2 rounded-md w-full" />
        </div>
        <select
          className="border-2 block mb-4 px-4 py-2 w-full rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">Select Category</option>
          <option value="fuel">Fuel</option>
          <option value="petrol">Petrol</option>
          <option value="salary">Salary</option>
        </select>
        <input
          type="text"
          placeholder="Expense Amount"
          className="border-2 block mb-4 px-4 py-2 w-full rounded-md"
          value={spentMoney}
          onChange={(e) => setSpentMoney(e.target.value)}
        />
        <button
          onClick={expenseHandler}
          className="bg-green-700 text-white px-6 py-2 rounded-md block mx-auto"
        >
          Add Expense
        </button>
      </div>
    </div>,
    modalToShow
  );
}

export default Modal;
