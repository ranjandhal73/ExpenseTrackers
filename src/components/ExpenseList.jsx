import React, { useState, useContext, useEffect } from 'react';
// import { ExpenseContext } from '../store/ExpenseContext';
import {removeFromAPI, updateExpenseHandler} from '../features/apiCall'
import { useDispatch } from 'react-redux';
import {removeExpense, updateExpense} from '../features/expenseSlice'

function ExpenseList({ expense }) {
  // const { removeExpense, updateExpense } = useContext(ExpenseContext);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const [editedExpense, setEditedExpense] = useState({
    id: expense.id,
    spentMoney: expense.spentMoney,
    desc: expense.desc,
    category: expense.category,
    date: expense.date,
    time: expense.time,
  });

  const [prevDate, setPrevDate] = useState('');

  useEffect(()=>{
    setPrevDate(expense.date);
  },[])

  const handleEditChange = (e) => {
    const { name, value } = e.target;
      setEditedExpense((prev) => ({ ...prev, [name]: value }))
  };

  const handleSave = async () => {
    try {
      const updatedExpense = await updateExpenseHandler(editedExpense, expense.id);
      dispatch(updateExpense(updatedExpense));
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const removeHandler = (id) =>{
    console.log(id);
    removeFromAPI(id);
    dispatch(removeExpense(id))
  }

  console.log();
  return (
    <div className='my-6 mx-auto w-10/12 md:w-8/12 lg:w-6/12'>
      {prevDate !== expense.date && (
        <hr className='my-4 border-gray-400' />
      )}
      <p className='text-md font-mono italic font-bold'>{expense.date} | {expense.time}</p>
      <div className='flex flex-col md:flex-row items-center justify-between shadow-md shadow-blue-200 border-2 py-4 px-4 md:px-8'>
        {isEditing ? (
          <div className='flex flex-col md:flex-row items-center gap-4 w-full'>
            <input
              type='text'
              name='spentMoney'
              value={editedExpense.spentMoney}
              onChange={handleEditChange}
              className='font-bold text-2xl border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full md:w-32 lg:w-40'
              placeholder='Amount'
            />
            <input
              type='text'
              name='desc'
              value={editedExpense.desc}
              onChange={handleEditChange}
              className='font-semibold text-xl italic border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full md:w-32 lg:w-40'
              placeholder='Description'
            />
            <input
              type='text'
              name='category'
              value={editedExpense.category}
              onChange={handleEditChange}
              className='font-semibold text-xl italic border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full md:w-32 lg:w-40'
              placeholder='Category'
            />
          </div>
        ) : (
          <div className='flex flex-col md:flex-row items-center gap-4 w-full'>
            <h1 className='font-bold text-2xl'>Rs:{expense.spentMoney}</h1>
            <p className='font-semibold text-xl italic'>{expense.desc}</p>
            <p className={`font-semibold text-xl italic ${expense.category.toLowerCase() === 'credit' ? 'text-green-700' : 'text-red-700'}`}>{expense.category}</p>
          </div>
        )}
        <div className='flex gap-3 mt-4 md:mt-0'>
          {isEditing ? (
            <button onClick={handleSave} className='bg-green-700 text-white px-4 py-1 rounded'>
              Save
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className='bg-blue-700 text-white px-4 py-1 rounded'>
              Edit
            </button>
          )}
          <button
            onClick={() => removeHandler(expense.id)}
            className='border-2 border-red-700 text-red-900 px-3 py-1 rounded'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseList;
