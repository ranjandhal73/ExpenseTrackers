import React from 'react'

function ExpenseList({expense}) {

  return (
    <div className='my-[1.5rem] mx-[3rem] '>
    <div className='flex items-center justify-around shadow-md shadow-blue-200 border-2 py-4'>
        <h1 className='font-bold text-2xl'>Rs:{expense.expense.spentMoney}</h1>
        <p className='font-semibold text-xl italic'>{expense.expense.desc}</p>
        <p className='font-semibold text-xl italic'>{expense.expense.category}</p>
    </div>
    </div>
  )
}

export default ExpenseList