import { createPortal } from "react-dom";
import React, { useState, useEffect } from "react";
// import { UserProfileContext } from "../store/UserProfileContext";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {addexpense} from '../features/expenseSlice'


function Modal({setIsPlusShowing}) {
  const modalToShow = document.getElementById("modal");

  const [spentMoney, setSpentMoney] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(state => state.userDetails.users);

  
  
  const expenseHandler = async () => {
    const newExpense = { spentMoney, desc, category, date, time };

    try {
      const response = await fetch(`https://expense-tracker-cbb1f-default-rtdb.firebaseio.com/usersExpense/${user.userId}.json`, {
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
      console.log(data);
      dispatch(addexpense({ id: data.name, ...newExpense }));
      toast.success("Expense has been added!");
      setIsPlusShowing(false)
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
        <button 
          className=""
          onClick={()=>setIsPlusShowing(false)}
        >
            Close</button>
        <h1 className="text-center text-2xl font-bold mb-4">Add New Transaction</h1>
        <input
          type="text"
          required
          placeholder="Expense Name"
          className="border-2 block mb-4 px-4 py-2 w-full rounded-md"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="flex gap-4 mb-4">
          <input 
            type="date" 
            required
            className="border-2 px-4 py-2 rounded-md w-full" 
            value={date}
            onChange={(e)=>setDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
          <input 
            type='time'
            required
            className="border-2 px-4 py-2 rounded-md w-full" 
            value={time}
            onChange={(e)=>setTime(e.target.value)}
          />
        </div>
        <select
          className="border-2 block mb-4 px-4 py-2 w-full rounded-md"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">Select Category</option>
          <option value="credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
        <input
          type="text"
          required
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
