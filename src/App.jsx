import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Welcome from "./components/Welcome";
import ExpenseForm from "./components/ExpenseForm";
import { useSelector, useDispatch } from "react-redux";
import { setExpenses } from "./features/expenseSlice";
import { setDarkMode } from "./features/themeSlice";


function App() {
  const [loading, setLoading] = useState(false)
  const token = useSelector((state) => state.auth.token);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector(state => state.userDetails.users)
  const dispatch = useDispatch();



  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') ;
    if (savedDarkMode !== null) {
      dispatch(setDarkMode(savedDarkMode));
    }
    async function fetchData() {
      setLoading(true);
     if(user && user.userId){ 
        try {
          const response = await fetch(
            `https://expense-tracker-cbb1f-default-rtdb.firebaseio.com/usersExpense/${user.userId}.json `
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
      setLoading(false)
    }
    fetchData();
  }, [user, dispatch]);


  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen pb-[1rem]`}>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-t-4 rounded-full animate-spin"></div>
        </div>
      )}
   
          {token && <Welcome />}
          {token && <ExpenseForm />}
          <Outlet />
    </div>
  );
}

export default App;
