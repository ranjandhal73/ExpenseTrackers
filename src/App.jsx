import { Outlet } from "react-router-dom";
import Signup from "./components/Signup"
import { AuthContext } from "./store/AuthContext"
import { useContext } from "react"
import Welcome from "./components/Welcome";
import ExpenseForm from "./components/ExpenseForm";


function App() {
  const {islLoggedIn, token} = useContext(AuthContext);

  return (
    <>
      {token && <Welcome />}
      {token && <ExpenseForm />}
      <Outlet />
    </>
  )
}

export default App
