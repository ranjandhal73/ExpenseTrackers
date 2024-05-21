import { Outlet } from "react-router-dom";
import { useEffect } from "react";
// import Signup from "./components/Signup"
// import { AuthContext } from "./store/AuthContext"
// import { useContext } from "react"
import Welcome from "./components/Welcome";
import ExpenseForm from "./components/ExpenseForm";
import { useSelector, useDispatch } from "react-redux";
import { addexpense, setExpenses } from "./features/expenseSlice";


function App() {
  // const { token} = useContext(AuthContext);
  const token = useSelector((state) => state.auth.token);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://expense-tracker-cbb1f-default-rtdb.firebaseio.com/usersExpense.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const loadedExpenses = [];
        for (const key in data) {
          loadedExpenses.push({
            id: key,
            ...data[key],
          });
        }
        dispatch(setExpenses(loadedExpenses));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);


  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {token && <Welcome />}
      {token && <ExpenseForm />}
      <Outlet />
    </div>
  );
}

export default App;
