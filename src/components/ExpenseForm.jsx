import React, { useState, useRef } from "react";
import ExpenseList from "./ExpenseList";
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineCalendar } from "react-icons/ai";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { RiVipCrown2Line } from "react-icons/ri";
import { Tooltip } from "@mui/material";

function ExpenseForm() {
  const [isPlusShowing, setIsPlusShowing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isDateInputVisible, setIsDateInputVisible] = useState(false);
  const dateInputRef = useRef(null);
  const user = useSelector(state => state.userDetails.users);
  const userId = user ? user.userId : null;
  const expenses = useSelector((state) => state.expenses.expenses);
  const reversedExpense = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalPrice = expenses.reduce((sum, expenses) => sum + Number(expenses.spentMoney), 0);
  const totalDebit = expenses
    .filter((item) => item.category.toLowerCase() === "debit")
    .reduce((sum, expense) => sum + Number(expense.spentMoney), 0);
  const totalCredit = expenses
    .filter((item) => item.category.toLowerCase() === "credit")
    .reduce((sum, expense) => sum + Number(expense.spentMoney), 0);

  const handleSearchClick = () => {
    setIsDateInputVisible(!isDateInputVisible);
  };

  const handleCalendarClick = () => {
    setIsDateInputVisible(true);
  };

  const handleDateChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleBlur = () => {
    setIsDateInputVisible(false);
  };

  const filteredExpenses = reversedExpense.filter((expense) => {
    if (!searchText) return true;
    return (
      expense.date.includes(searchText) || 
      expense.spentMoney.includes(searchText) ||
      expense.category.toLowerCase().includes(searchText)
    );
  });

  const handleDownloadClick = () => {
    const csvContent = generateCSV(expenses);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "expenses.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateCSV = (data) => {
    const headers = ["Date","Time", "Category", "Spent Money", "Desc."];
    const rows = data.map(expense => [
      expense.date,
      expense.time,
      expense.category,
      expense.spentMoney,
      expense.desc,
    ]);
    
    const csvContent = [
      headers.join(","), 
      ...rows.map(row => row.join(","))
    ].join("\n");

    return csvContent;
  };

  return (
    <>
      <div className="flex items-center justify-evenly px-4 md:px-8 py-4 w-full">
        <h1 className="text-xl md:text-2xl font-semibold">Transactions</h1>
        <div>
          {totalPrice >= 100000 ? (
            <button className="bg-green-700 text-white px-4 py-2 rounded-lg" onClick={handleDownloadClick}>Download Your Transactions</button>
          ) : (
            <div className="flex items-center text-xl italic font-extralight">
              <Tooltip title="You have to spend at least 100000 to unlock VIP" className="flex items-center cursor-pointer">
                <p>Unlock VIP</p>
                <RiVipCrown2Line className="text-2xl text-yellow-400"/>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center items-center my-4">
        <div className="flex items-center w-10/12 md:w-8/12 lg:w-6/12 relative">
          <input
            type="text"
            placeholder="Search your transaction here..."
            className="border-2 block px-4 py-2 rounded-lg w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={handleSearchClick}
            onBlur={handleBlur}
          />
          {isDateInputVisible && (
            <>
              <input
                type="date"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                max={new Date().toISOString().split("T")[0]}
                ref={dateInputRef}
                onChange={handleDateChange}
              />
              <AiOutlineCalendar
                className="absolute right-2 top-2 text-2xl text-gray-400 cursor-pointer"
                onClick={handleCalendarClick}
              />
            </>
          )}
        </div>
        <div
          onClick={() => setIsPlusShowing(true)}
          className="fixed transform -translate-y-10 bottom-[1rem] right-[1rem] md:bottom-[1rem] md:right-[3rem] lg:bottom-[4rem] lg:right-[15rem] cursor-pointer"
        >
          <CiCirclePlus className="text-5xl text-blue-800" />
        </div>
      </div>
      <div className="text-center text-5xl text-blue-800">
        {isPlusShowing && <Modal setIsPlusShowing={setIsPlusShowing} />}
      </div>
      <div className="flex flex-col items-center w-full md:w-8/12 lg:w-6/12 mx-auto">
        <h1 className="text-2xl font-bold my-2">Total Expense: {totalPrice}</h1>
        <div className="flex gap-8 mb-4">
          <p className="text-red-500">Debit: {totalDebit}</p>
          <p className="text-green-500">Credit: {totalCredit}</p>
        </div>
      </div>
      {filteredExpenses.map((item) => (
        <ExpenseList key={item.id} expense={item} userId={userId}/>
      ))}
    </>
  );
}

export default ExpenseForm;
